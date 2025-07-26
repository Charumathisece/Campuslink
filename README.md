# CampusLink Client

This is the client-side React application for the CampusLink management system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Project Structure

```
client/
├── public/              # Static files
├── src/                # Source code
│   ├── assets/         # Images, logos, etc.
│   ├── components/     # React components
│   │   ├── AdminLogin.jsx
│   │   └── StudentLogin.jsx
│   ├── pages/         # Page components
│   │   ├── HomePage.jsx
│   │   └── LoginPage.jsx
│   ├── App.jsx        # Main application component
│   ├── index.js       # Entry point
│   └── routes.js      # Route definitions
└── package.json       # Project dependencies
```

## Features

- Admin and Student login interfaces
- Modern React routing with react-router-dom
- Clean and organized component structure
- Responsive design
