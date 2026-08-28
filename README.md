# TravelMind

> **“TravelMind doesn’t just plan your trip. It keeps your trip on track.”**

TravelMind is an AI-powered adaptive travel planner built around one product loop: **PLAN → OPTIMIZE → ADAPT → EXPLAIN**. It creates a personalized route, watches for real-world disruption, and repairs only the affected part of the remaining day.

## Why TravelMind is different

Traditional itinerary planners primarily focus on generating the initial travel plan. TravelMind focuses on both itinerary generation and itinerary recovery. When real-world conditions change, TravelMind preserves completed and high-value activities while re-optimizing only the affected portion of the remaining journey.

The core rule is simple: **LLMs understand and explain; algorithms decide and optimize.** Gemini extracts structured requirements and can write natural explanations. A weighted recommendation engine, constraint heuristic, Haversine route optimizer, and minimum-disruption recovery engine make the actual decisions.

## Demo flow

1. Enter the provided Chennai request (or click a suggestion).
2. Review the structured understanding: destination, travelers, budget, interests, and exclusions.
3. Watch the recommendation, constraint, and route optimization stages.
4. Explore the itinerary, map, spend, distance, match score, and explanation.
5. Start the trip and choose **Running late → 2 hours**.
6. Review the animated before/after recovery, impact metrics, and decision rationale.
7. Accept the updated plan. Weather, budget, and place-unavailable controls use the same recovery surface.

`DEMO_MODE=true` makes this entire flow deterministic without Gemini, weather, places, or database credentials.

## Architecture

```text
Natural language → Gemini/NLP → structured requirements
  → knowledge graph → recommendation scoring
  → constraint optimizer → route optimizer → itinerary
  → real-world event → minimum-disruption recovery → explanation
```

- **Web:** React 19, Vinext/Vite, Tailwind CSS, responsive CSS, accessible semantic controls
- **API:** Node.js, Express, REST, Zod-ready validation boundary
- **Data:** PostgreSQL schema for users, trips, items, events, revisions, places, preferences, logs, entities, and relationships
- **AI:** Gemini structured extraction with deterministic fallback
- **Optimization:** weighted recommendation scoring, budget/time/opening constraints, Haversine + nearest-neighbor route ordering
- **Recovery:** completed-item freezing, preservation priority, invalid-item removal, alternative search, re-routing, change explanations

## Run locally

```bash
npm install
npm run dev
```

The polished demo runs at `http://localhost:3000`. For the API:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Or run the complete stack with PostgreSQL:

```bash
docker compose up --build
```

Initialize PostgreSQL with `backend/src/db/schema.sql`.

## Environment variables

See `backend/.env.example`. Keep `GEMINI_API_KEY`, `OPENWEATHER_API_KEY`, `JWT_SECRET`, and `DATABASE_URL` server-side. When external services fail, the API returns safe demo behavior instead of breaking the experience.

## API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `POST /api/trips/parse-request`, `POST /api/trips/generate`
- `GET /api/trips`, `GET /api/trips/:id`, `POST /api/trips/:id/start`
- `POST /api/trips/:id/recover`
- `GET /api/places`, `GET /api/places/recommendations`, `GET /api/places/:id`

Recovery accepts `DELAY`, `WEATHER_CHANGE`, `BUDGET_CHANGE`, and `PLACE_UNAVAILABLE` events. The Chennai seed contains 26 varied places and deterministic scores.

## Future improvements

Swap the repository layer to managed PostgreSQL in production, add live transit and closure feeds, learn preference weights from behavior, use OR-Tools for larger multi-day routes, and replace the PostgreSQL knowledge graph service with Neo4j without changing its public interface.
