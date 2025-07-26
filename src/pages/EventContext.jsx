import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);


  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter(e => e.id !== id));
  };

  const editEvent = (id, updatedEvent) => {
    setEvents((prevEvents) => prevEvents.map(e => e.id === id ? { ...e, ...updatedEvent, updatedAt: new Date().toISOString() } : e));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, editEvent }}>
      {children}
    </EventContext.Provider>
  );
};