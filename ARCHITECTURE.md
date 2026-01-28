# Architecture Documentation

## Overview

This Star Wars Databank is a Next.js 16 application that provides a searchable, filterable interface to explore the Star Wars universe using data from SWAPI (Star Wars API).

## Architectural Decisions

### 1. **Configuration-Driven Architecture**

**Decision**: Use a centralized configuration object (`entity-config.ts`) to define all entity types.

**Rationale**: 
- Eliminates code duplication across entity types
- Makes it easy to add new entity types
- Provides a single source of truth for entity metadata

**Location**: `/components/entity-grid/entity-config.ts`

### 2. **Separation of Concerns**

**Components are organized by responsibility**:

- **Server Components** (`entity-grid.tsx`): Handle data fetching
- **Client Components** (`entity-grid-client.tsx`): Handle interactivity
- **API Service Layer** (`lib/api-service.ts`): Centralize API calls and error handling
- **UI Components** (`components/ui/`): Reusable presentational components

### 3. **Type Safety**

**Decision**: Use TypeScript with strict mode and proper type definitions.

**Implementation**:
- Type definitions for all SWAPI entities (`types/`)
- Type-safe helper functions for dynamic property access
- Proper typing for icon components and configurations

### 4. **Error Handling**

**Decision**: Implement error boundaries at the route level.

**Implementation**:
- Each route has an `error.tsx` file
- API service includes try-catch blocks and error logging
- Graceful degradation for missing data

### 5. **Performance Optimization**

**Strategies**:
- Static generation with ISR (Incremental Static Regeneration)
- Data revalidation every hour (3600 seconds)
- Efficient pagination handling in API fetches
- Next.js App Router for optimal loading states

### 6. **Code Organization**

```
├── app/                      # Next.js App Router (route handlers)
│   ├── [entity]/            # Each entity type has its own route
│   │   ├── page.tsx        # List view
│   │   ├── [slug]/page.tsx # Detail view
│   │   ├── loading.tsx     # Loading state
│   │   └── error.tsx       # Error boundary
│   └── layout.tsx          # Root layout
├── components/
│   ├── entity-grid/        # Entity display components & config
│   └── ui/                 # Shadcn/ui components
├── features/               # Feature-specific components (e.g., sidebar)
├── lib/                    # Utilities and services
│   ├── api-service.ts     # Centralized API logic
│   └── utils.ts           # Helper functions
└── types/                  # TypeScript type definitions
```

## Design Patterns

### 1. **Configuration Pattern**
- Centralized configuration reduces duplication
- Easy to extend and maintain

### 2. **Service Layer Pattern**
- API logic separated from components
- Easier to test and modify
- Consistent error handling

### 3. **Compound Component Pattern**
- Complex UI (DetailView) composed of smaller parts
- Better reusability and maintainability

## Future Improvements

### Potential Enhancements:
1. **Consolidate Routes**: Use dynamic `[entity]` route instead of 6 separate folders
2. **Detail Page Configuration**: Move detail page logic to entity config
3. **Caching Strategy**: Implement more sophisticated caching
4. **Testing**: Add unit and integration tests
5. **Accessibility**: Enhance ARIA labels and keyboard navigation
6. **Search Optimization**: Implement client-side search indexing

## Key Files

- `components/entity-grid/entity-config.ts` - Entity metadata configuration
- `lib/api-service.ts` - API service layer
- `components/entity-grid/entity-grid.tsx` - Server component for data fetching
- `components/entity-grid/entity-grid-client.tsx` - Client component for display
- `components/detail-view.tsx` - Generic detail page component

## Development Guidelines

### Adding a New Entity Type:
1. Add type definition in `types/`
2. Add configuration in `entity-config.ts`
3. The existing components will automatically handle the new type

### Modifying Entity Display:
1. Update the configuration in `entity-config.ts`
2. No code changes needed in components

### API Changes:
1. All API logic is in `lib/api-service.ts`
2. Update there for global changes
