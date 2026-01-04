# CRIC STORE - Product Requirements Document

## Original Problem Statement
Create a pixel-perfect clone of `https://crickstore.com/` with updated branding:
- **Brand Name:** CRIC STORE
- **Color Scheme:** Radiant white and neon green gradients

## Project Type
Frontend-only React application (no backend/database implemented yet)

## Tech Stack
- **Frontend:** React, React Router, TailwindCSS
- **UI Components:** Custom components + Shadcn UI available
- **Data:** Mock JavaScript files (scraped from original site)

---

## Completed Features

### Core Pages
| Feature | Status | Date | Files |
|---------|--------|------|-------|
| Homepage | ✅ Done | - | `App.js`, `HeroCarousel.jsx`, `CategorySection.jsx`, etc. |
| Cricket Bats Collection | ✅ Done | - | `CricketBatsCollectionNew.jsx`, `cricketBatsDataNew.js` |
| Kit Bags Collection | ✅ Done | - | `KitBagsCollection.jsx`, `kitBagsData.js` |
| Batting Gear Collection | ✅ Done | - | `BattingGearCollection.jsx`, `battingGearData.js` |
| Cricket Helmets Collection | ✅ Done | - | `CricketHelmetsCollection.jsx`, `cricketHelmetsData.js` |
| Batting Pads Collection | ✅ Done | Jan 4, 2026 | `BattingPadsCollection.jsx`, `battingPadsData.js` |
| Protection Collection | ✅ Done | Jan 4, 2026 | `ProtectionCollection.jsx`, `protectionData.js` |
| Wicket Keeping Collection | ✅ Done | Jan 4, 2026 | `WicketKeepingCollection.jsx`, `wicketKeepingData.js` |
| Balls Collection | ✅ Done | Jan 4, 2026 | `BallsCollection.jsx`, `ballsData.js` |
| Footwear Collection | ✅ Done | Jan 4, 2026 | `FootwearCollection.jsx`, `footwearData.js` |

### Navigation
| Feature | Status | Date | Files |
|---------|--------|------|-------|
| Header with nav links | ✅ Done | - | `Header.jsx` |
| Batting Gear dropdown menu | ✅ Done | - | `Header.jsx` |
| Mobile responsive menu | ✅ Done | - | `Header.jsx` |

---

## Pending/Upcoming Tasks

### P1 - High Priority
- [ ] **Batting Gloves Collection** - Create page and link from dropdown (currently links to batting-gear)

### P2 - Medium Priority  
- [ ] **Backend Development** - MongoDB models, FastAPI CRUD endpoints
- [ ] **API Integration** - Connect frontend to backend instead of mock data

### P3 - Low Priority / Refactoring
- [ ] **Component Consolidation** - Merge similar collection components into reusable `CollectionPage`
- [ ] **File Cleanup** - Remove orphaned files (`CricketBatsCollection.jsx`, `cricketBatsData.js`)
- [ ] **Product Detail Pages** - Implement full product detail views

---

## Data Architecture

All product data is stored in `/app/frontend/src/data/`:
- `mockData.js` - Homepage data
- `cricketBatsDataNew.js` - 36 cricket bats (3 pages)
- `kitBagsData.js` - 33 kit bags
- `battingGearData.js` - 4 batting gear items
- `cricketHelmetsData.js` - 6 helmets (1 per brand)
- `battingPadsData.js` - 9 batting pads (1 per brand)
- `protectionData.js` - 4 protection items (abdominal, thigh, arm, chest guards)
- `wicketKeepingData.js` - 5 wicket keeping gloves
- `ballsData.js` - 5 cricket balls (red and white)
- `footwearData.js` - 6 cricket shoes (rubber studs and spikes)

---

## Routes Configuration

```javascript
/                           → HomePage
/collections/cricket-bats   → CricketBatsPage
/collections/kit-bags       → KitBagsPage
/collections/batting-gear   → BattingGearPage
/collections/helmets        → CricketHelmetsPage
/collections/batting-pads   → BattingPadsPage
/collections/protection     → ProtectionPage
/collections/wicket-keeping → WicketKeepingPage
/collections/balls           → BallsPage
/collections/footwear        → FootwearPage
/collections/*              → CollectionPage (fallback)
/product/:id                → ProductPage (placeholder)
```

---

## Notes
- All images are sourced from the original `crickstore.com` CDN
- No backend or database implemented - entirely frontend mock data
- Application is fully responsive with mobile navigation support
