# Star Wars React App

A comprehensive, searchable database for exploring the Star Wars universe, built with Next.js 16 and powered by SWAPI (Star Wars API).

## Features

- **Entity-based routing**: Browse `films`, `people`, `planets`, `species`, `starships`, and `vehicles`
- **Type-safe architecture**: Full TypeScript with strict mode and comprehensive type definitions
- **Configuration-driven design**: Centralized entity configurations for easy maintenance
- **Error handling**: Error boundaries at route level for graceful failure recovery
- **Visual styling**: Star Wars-inspired design with customized `shadcn/ui` components
- **Starfield background**: Interactive WebGL galaxy background effect
- **Search & filtering**: Find entities quickly with built-in search and filters
- **Static generation**: Pre-rendered pages with ISR for optimal performance

## Architecture

This project follows clean architecture principles with clear separation of concerns:

- **API Service Layer** (`lib/api-service.ts`): Centralized data fetching with error handling
- **Configuration Layer** (`components/entity-grid/entity-config.ts`): Entity metadata and display rules
- **Presentation Layer** (`components/`): Reusable UI components
- **Route Layer** (`app/`): Next.js app routes organized by entity type

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architectural documentation.

## Quickstart — Local Development

**Prerequisites**: Node.js (v18+) and npm installed.

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

3. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` — Starts the Next.js development server
- `npm run build` — Builds the production bundle
- `npm run start` — Runs the production server after `build`
- `npm run lint` — Runs ESLint to check code quality

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── [entity]/            # Entity-specific routes
│   │   ├── page.tsx        # List view
│   │   ├── [slug]/page.tsx # Detail view
│   │   ├── loading.tsx     # Loading state
│   │   └── error.tsx       # Error boundary
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── entity-grid/        # Entity display components
│   │   ├── entity-config.ts      # Configuration for all entities
│   │   ├── entity-grid.tsx       # Server component
│   │   └── entity-grid-client.tsx # Client component
│   ├── ui/                 # Shadcn/ui primitives
│   └── detail-view.tsx     # Generic detail page
├── features/
│   └── sidebar/            # Sidebar navigation feature
├── lib/
│   ├── api-service.ts     # API service layer
│   ├── config-helpers.ts  # Configuration helper functions
│   ├── constants.ts       # Application constants
│   └── utils.ts           # Utility functions
├── types/                  # TypeScript type definitions
└── styles/                 # Global styles

```

## Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5+
- **UI**: Tailwind CSS 4, Radix UI, Shadcn/ui
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Data Source**: SWAPI (swapi.py4e.com)

## Code Quality

This project emphasizes:
- ✅ Type safety with TypeScript
- ✅ Error handling at all levels
- ✅ Configuration over code
- ✅ Clean separation of concerns
- ✅ Comprehensive documentation

## Lessons Learned

See [LESSONS_LEARNED.md](./LESSONS_LEARNED.md) for insights on architectural decisions and recommendations for future projects.

## Contributing

When adding new features:
1. Follow the existing architectural patterns
2. Add proper TypeScript types
3. Include error handling
4. Update documentation
5. Run `npm run lint` before committing

## License

This project was created as a coding challenge demonstration.

