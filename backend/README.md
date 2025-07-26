# BetterTown Backend

A MERN-based civic engagement platform backend that provides features for students and administrators to manage campus activities and communications.

## Features

- User Authentication (Students & Admins)
- Complaint Management System
- Event Management System
- Announcement System
- Lost & Found System
- Timetable Management
- Location-based Services

## Tech Stack

- Node.js + Express
- MongoDB
- JWT Authentication
- Google Maps API
- Firebase OTP Authentication

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file and add your environment variables:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/user - Get user profile

### Complaints
- POST /api/complaints - Create new complaint
- GET /api/complaints - Get all complaints
- GET /api/complaints/:id - Get complaint by ID
- PUT /api/complaints/:id - Update complaint status
- DELETE /api/complaints/:id - Delete complaint

### Events
- POST /api/events - Create new event
- GET /api/events - Get all events
- GET /api/events/:id - Get event by ID
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event

### Announcements
- POST /api/announcements - Create new announcement
- GET /api/announcements - Get all announcements
- GET /api/announcements/:id - Get announcement by ID
- PUT /api/announcements/:id - Update announcement
- DELETE /api/announcements/:id - Delete announcement

### Lost & Found
- POST /api/lost-found - Create new lost/found item
- GET /api/lost-found - Get all lost/found items
- GET /api/lost-found/:id - Get item by ID
- PUT /api/lost-found/:id - Update item
- DELETE /api/lost-found/:id - Delete item

### Timetable
- POST /api/timetable - Create new timetable
- GET /api/timetable - Get all timetables
- GET /api/timetable/:courseCode - Get timetable by course code
- PUT /api/timetable/:courseCode - Update timetable
- DELETE /api/timetable/:courseCode - Delete timetable

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FIREBASE_API_KEY` - Firebase API key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
