# Netflix Clone

A full-stack Netflix clone built with Next.js, NestJS, and TypeScript.

## Features

- 🎬 Browse trending movies and TV shows
- 🎭 Genre-based content filtering
- 👤 User profiles with avatar selection
- 📱 Responsive design
- 🔐 User authentication (JWT)
- 💾 Local storage for profiles
- 🎥 Movie details and trailers
- 📺 Watch list functionality

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **SQLite** - Database (development)
- **JWT** - Authentication
- **Passport** - Authentication strategy

### External APIs
- **TMDB API** - Movie and TV show data

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Netflix-clone
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Set up environment variables**
   
   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   
   **Backend** (`backend/.env`):
   ```env
   DATABASE_URL=file:./prisma/dev.db
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_API_URL=https://api.themoviedb.org/3
   ```

4. **Initialize database**
   ```bash
   cd backend
   npx prisma db push
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run start:dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Deployment on Vercel

### 1. Prepare for Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

### 2. Deploy on Vercel

1. **Go to [Vercel](https://vercel.com) and sign up/login**

2. **Import your GitHub repository**

3. **Set Environment Variables in Vercel Dashboard:**
   - `NEXT_PUBLIC_TMDB_API_KEY` - Your TMDB API key
   - `NEXT_PUBLIC_TMDB_API_URL` - `https://api.themoviedb.org/3`
   - `TMDB_API_KEY` - Your TMDB API key (for backend)
   - `TMDB_API_URL` - `https://api.themoviedb.org/3`

4. **Deploy**
   - Vercel will automatically detect it's a Next.js project
   - The frontend will be deployed automatically
   - Backend API routes will work as serverless functions

### 3. Production Configuration

The project is configured for Vercel deployment with:
- `vercel.json` - Main configuration
- `frontend/vercel.json` - Frontend-specific settings
- Optimized build scripts
- Environment variable setup

## Project Structure

```
Netflix-clone/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   └── styles/          # CSS files
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # NestJS backend
│   ├── src/                 # Source code
│   ├── prisma/              # Database schema
│   └── package.json
├── vercel.json              # Vercel configuration
└── README.md
```

## API Endpoints

### Movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/genre/:id` - Get movies by genre
- `GET /api/movies/:id` - Get movie details

### Profiles
- `GET /api/profiles` - Get user profiles
- `POST /api/profiles` - Create profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

## Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run lint         # Run ESLint
```

### Database Management
```bash
cd backend
npx prisma db push          # Push schema changes
npx prisma studio           # Open database GUI
npx prisma generate         # Generate Prisma client
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie API
- [Netflix](https://netflix.com) for the design inspiration
- [Vercel](https://vercel.com) for hosting platform