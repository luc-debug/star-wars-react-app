# Chain of Thoughts

### Goals & Constraints

- Timebox: ~8 hours (prioritize features over polish).
- Focus: deliver useful UI features first; avoid spending excessive time on visual design.
- No strict product requirements: explore and choose a manageable direction.

### Research (links)

- Visual inspiration (particle/galaxy): https://codepen.io/ybensira/pen/byYNBZ
- Star Wars reference and lore: https://starwars.tales.wiki/
- Lightweight ready-made background explored: https://www.reactbits.dev/backgrounds/galaxy

### Evaluation & Decision

- Highly polished designs looked great but would exceed the timebox.
- A ready background component (`reactbits`) offered a faster path, but it was heavy on memory and performance.
- Decision: integrate a galaxy background for atmosphere, then optimize it for performance rather than building a custom full-featured shader from scratch.

- **Theming:** Custom Star Wars color palette implemented, which overrides the default `shadcn/ui` design.

## 🔐 Type Safety

**TypeScript Integration:** Generation of TypeScript types from schema.

**API Data Structure:** SWAPI provides 6 primary resources: People, Films, Planets, Species, Starships, Vehicles, with relational links between them.

---

## 🚀 Routing & Navigation

**Hierarchical URL Structure:**

```
/planets/[id]
/species/[id]
/vehicles/[id]
/starships/[id]
/people/[id]
/films/[id]
```

**Implementation:**

- Next.js dynamic routes using the `[id]` pattern for individual entities.
- All content is accessible via dynamic segments.

---

## Future (v2)

**Features**

- Search, filtering, sorting
- Comprehensive error boundaries
- Loading states
- Deployment to Vercel
- Pagination
- Sidebar is incomplete (currently shows only the first page of each Star Wars entity, e.g., Vehicles)
- SWAPI uses relational URLs between resources (e.g., Person → Films → Planets) — this enables linking between entities.

**Improvements**

- Implement server actions for data fetching instead of client-side fetching
- Performance optimizations for the galaxy background
- Global API key

---

## 💡 Summary

✅ Pragmatic component choices (galaxy background)

✅ Type-safe development via schema-to-TypeScript

✅ Scalable, feature-based architecture

✅ Clear hierarchical routing structure
