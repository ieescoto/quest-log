# QuestLog

**Turn your everyday tasks into epic adventures.**

QuestLog is a fantasy RPG-inspired quest management application that transforms everyday activities into missions. Users can create quests, track their progress, earn experience points and coins, and level up their adventurer as they complete tasks.

The project combines task management with RPG progression mechanics to make productivity more engaging and rewarding.

## Live Demo

**[View Live Application](https://vercel.app)**  
*(No login required — an anonymous adventurer profile is automatically generated on your first visit).*

---

## Features

### Quest Management
- Create, edit, and delete quests.
- Search quests by title and filter by status, category, and difficulty.
- Track quest status (`pending` or `completed`).
- Set optional deadlines.
- View detailed information about individual quests.

### RPG Progression System
- Earn experience points (XP) by completing quests.
- Earn coins as quest rewards.
- Level up as experience points accumulate.
- Track current level and progress toward the next level.
- Prevent completed quests from rewarding XP and coins more than once.

### Player Profile
- Customize your adventurer's username.
- Choose an avatar from curated RPG icons.
- View player level and experience.
- Track accumulated coins and completed quests.

### Character Collection
**Status: In Development**

A character collection system is planned for a future update. Players will be able to unlock different characters using coins earned from completed quests.

Each character will have unique passive abilities that provide gameplay bonuses and influence the player's progression.

Examples of planned abilities include:

- **Experience Boost:** Earn 10% additional XP from completed quests (1.1x XP multiplier).
- **Coin Bonus:** Earn 10 additional coins for every completed quest.
- **Special Bonuses:** Other characters may introduce different passive abilities and progression advantages.

Players will be able to unlock multiple characters but can only select and activate **one character at a time**. Only the selected character's ability will apply to quest rewards.

This system will encourage players to collect characters and choose the one that best fits their progression strategy.

---

## Architecture & Engineering Decisions

- **Zero-Friction Onboarding:** On first visit, the application creates a player profile using a PostgreSQL-generated `UUID`, stores the profile ID in `localStorage`, and seeds 5 starter quests. This eliminates registration friction while allowing the application to recognize the same anonymous player across visits on the same browser.
- **Single Source of Truth:** Player levels and next-level XP thresholds are deterministically derived on the client from accumulated `xp`, preventing redundant columns and state desynchronization in the database.
- **Database-Level Validation:** Form validation rules defined with **Zod** and **React Hook Form** are reinforced by PostgreSQL `CHECK` constraints, providing an additional layer of data integrity.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| React | User interface development |
| TypeScript | Static typing |
| Tailwind CSS | Styling and responsive design |
| React Router | Application navigation |
| Supabase | Backend and database |
| PostgreSQL | Relational database |
| React Hook Form | Form management |
| Zod | Form validation |

---

## Database Structure

QuestLog uses Supabase as its backend platform, with PostgreSQL as its relational database.

The current database consists of two main tables (defined in `supabase/schema.sql`):

### Profiles

Stores player information and progression data.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key, automatically generated (`gen_random_uuid()`) |
| `username` | `TEXT` | Player's username |
| `avatar` | `TEXT` | Selected player avatar |
| `xp` | `INTEGER` | Accumulated experience points |
| `coins` | `INTEGER` | Available coins |
| `created_at` | `TIMESTAMPTZ` | Profile creation timestamp |

### Quests

Stores the quests associated with each player.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `BIGINT` | Primary key, automatically generated |
| `user_id` | `UUID` | References the associated profile |
| `title` | `TEXT` | Quest title (3–60 characters) |
| `description` | `TEXT` | Quest description (10–300 characters) |
| `category` | `TEXT` | Quest category (`study`, `adventure`, `combat`, `exploration`) |
| `difficulty` | `TEXT` | Quest difficulty (`easy`, `medium`, `hard`, `epic`) |
| `status` | `TEXT` | `pending` or `completed` |
| `deadline` | `DATE` | Optional quest deadline |
| `created_at` | `TIMESTAMPTZ` | Quest creation timestamp |

The `quests.user_id` column references `profiles.id`. The relationship uses `ON DELETE CASCADE`, so deleting a profile also deletes its associated quests.

Database `CHECK` constraints enforce valid values, required fields, and character limits.

---

## Quest Categories

Quests can be organized into four categories:

- **Study:** Academic tasks and learning activities.
- **Adventure:** Personal goals and everyday challenges.
- **Combat:** Challenging tasks that require effort and determination.
- **Exploration:** Activities focused on discovering and learning new things.

---

## Quest Difficulties and Rewards

Each quest difficulty determines the rewards received upon completion.

| Difficulty | Experience (XP) | Coins |
| :--- | :---: | :---: |
| Easy | 20 | 10 |
| Medium | 50 | 25 |
| Hard | 100 | 50 |
| Epic | 200 | 100 |

Every **100 XP** earned increases the player's level.

---

## Getting Started (Local Development)

### Prerequisites

Make sure you have installed:
- **Node.js** (v18+)
- **npm**
- A **Supabase** project (free tier)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ieescoto/quest-log
   cd questlog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   Run the SQL script located in `supabase/schema.sql` inside your Supabase **SQL Editor** to create the `profiles` and `quests` tables along with their constraints.

4. **Configure environment variables:**
   Copy `.env.example` to `.env` in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```
   *(Note: Use the public client key provided by Supabase. Never expose your service role/secret key in frontend code).*

5. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Future Improvements

The following features are planned for future development:

- Character collection and unlocking system.
- Unique passive abilities for each character.
- Character selection system, allowing only one active character at a time.
- Additional RPG customization options.
- Further improvements to the player progression experience.

---

## Project Status

QuestLog is currently under active development (**v1.0 Core MVP Live**).

The core quest management, player progression, and profile features are fully implemented and part of the current project scope. The Character Collection feature is currently in development and is not yet available.

---

## Author

**Isaac Escoto**  
Designed and built as a full-stack productivity application focused on type-safe architecture, relational data integrity, and gamified user engagement.

---

**QuestLog — Every task is a new adventure.**
