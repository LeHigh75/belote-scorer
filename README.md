# Belote Scorer

A modern full-stack web application for scoring belote games, managing players, and tracking ELO rankings.

## Features

- 🎮 **Game Recording**: Record games with 4 players and automatic ELO calculation
- 👥 **Player Management**: Add, edit, and manage players
- 🏆 **ELO Rankings**: Track player rankings with win rates and stats
- 📊 **Game History**: View recent games with detailed score breakdowns
- 🔐 **Authentication**: Secure admin-only access
- 🎨 **Dark Theme**: Modern UI with card suit-inspired colors

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, Tailwind CSS
- **UI**: shadcn/ui components
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: iron-session (encrypted cookies)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or cloud database like Neon)

### Installation

1. Clone the repository:
   ```bash
   cd belote-scorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and set:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A random 32-character string

4. Set up the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) and login:
   - Username: `admin`
   - Password: `admin123`

## Project Structure

```
belote-scorer/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login page
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── players/       # Player management
│   │   ├── games/         # Game recording & list
│   │   └── rankings/      # ELO leaderboard
│   └── api/               # API routes (if needed)
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities
│   ├── actions/          # Server Actions
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # Auth utilities
│   └── elo.ts            # ELO calculation
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── middleware.ts          # Auth middleware
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npx prisma studio` - Open Prisma Studio (database GUI)

## ELO System

The application uses a standard ELO rating system:
- Starting ELO: 1000
- K-factor: 32
- Team ELO is the average of both players
- Winners gain ELO, losers lose the same amount (zero-sum)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Database Options

- [Neon](https://neon.tech) - Serverless Postgres (free tier)
- [Supabase](https://supabase.com) - Postgres with additional features
- [Railway](https://railway.app) - Simple deployment platform

## Testing

Run tests:
```bash
npm test
```

Run type checking:
```bash
npx tsc --noEmit
```

## Security

- Passwords hashed with bcrypt (10 rounds)
- Session cookies encrypted with iron-session
- Environment variables for sensitive data
- No user registration endpoint (admin created via seed)

## License

MIT
