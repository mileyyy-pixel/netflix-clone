
# Netflix Clone

A full-stack Netflix clone built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design mimicking Netflix's UI
- User authentication with JWT
- Trending movies section using TMDB API integration
- Video streaming functionality
- Interactive components like FAQ accordions
- Mobile-friendly layout

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- JavaScript
- React
- JSON
- Tailwind CSS
- Lucide React for icons

### Backend
- Node.js
- Express (or your backend framework)
- PostgreSQL (or your database)
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL (for the backend)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/Netflix-clone.git
   cd Netflix-clone
   ```

2. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

3. Set up frontend environment variables
   - Copy `frontend/.env.example` to `frontend/.env.local`
   - Add your TMDB API key to `frontend/.env.local`

4. Install backend dependencies
   ```bash
   cd ../backend
   npm install
   ```

5. Set up backend environment variables
   - Copy `backend/.env.example` to `backend/.env`
   - Configure your database connection and JWT secret

6. Start the development servers
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Screenshots

(Add screenshots of your application here)

## API Integration

This project uses The Movie Database (TMDB) API to fetch movie data. You'll need to:

1. Create an account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Get an API key
3. Add it to your `.env.local` file

## License

This project is for educational purposes only. All trademarks are the property of their respective owners.

## Acknowledgments

- Netflix for the UI inspiration
- TMDB for the movie data API

