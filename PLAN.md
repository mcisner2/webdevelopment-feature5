# ASL Awareness Project: Development Plan

Marcos Cisneros and Elijah Jones

This plan turns Feature 5 into the full course project. The emphasis is on two things:

1. **AI quiz builder**: a user chats with an assistant and gets a quiz back.
2. **Animated sign library**: quizzes that show animated ASL signs.

Everything else (progress tracking, awareness page, history filter, deploy) supports those two.

---

## 1. Where the project is today

- Working: Parse/Back4App backend, authentication, protected routes, Signs page (28x28 grayscale sprites drawn on a canvas), History page.
- Not wired in yet: `quiz.json` (a few questions) and `awareness.json` (2 entries) exist but have no routes.
- Missing: Progress and QuizResult classes, category filter on History, any animated signs, any AI feature, Vercel deployment.
- Known bug to fix first: `SignPage.jsx` imports `./signImage.jsx`, but the file is `SignImage.jsx`. This works on macOS and breaks on Vercel's Linux build.
- The Signs page itself says motion is not included, so J, Z and any word signs need new animated assets.

## 2. User and developer stories

| # | Story | Group |
|---|---|---|
| 1 | Developer stores what each user has learned in a `Progress` class linked to their account | Data |
| 2 | Logged-in user saves quiz scores to a `QuizResult` class | Data |
| 3 | User takes a quiz loaded from `quiz.json` and sees the score on submit | Quiz |
| 4 | User browses a finished Awareness page of ASL resources | Content |
| 5 | User reads expanded ASL history facts and filters them by category | Content |
| 6 | Developer deploys the site to Vercel from `develop` and `main` | Deploy |
| 7 | **User builds quizzes via AI** (Node backend/Cloud Code to LLM API, React chat widget) | **Core** |
| 8 | **User loads and takes quizzes using a library of animated sign images** (`quiz.json` / `quiz.md` helps the LLM load them) | **Core** |

Partner stories go here so we can align them with the above:

- _(add stories)_

## 3. Decisions made

| Decision | Choice | Why |
|---|---|---|
| Frontend host | Vercel (`main` = production, `develop` = preview) | Story 6 |
| Backend for AI | **Back4App Cloud Code** (Node) | Matches story 7; user is built in as `request.user`. We have access to the Back4App account. |
| LLM | **Google Gemini API free tier** (via Google AI Studio) | Free, supports JSON-schema structured output. Behind a small adapter file so it can be swapped (Groq, OpenRouter). |
| Chat widget scope | **Quiz building only** (no tutoring) | Keeps it simple and safe |
| Animation source | Openly licensed assets from the internet (mainly Wikimedia Commons), downloaded into the repo with attribution | Reuse without license problems |

Caveats:
- Cloud Code is deployed separately from Vercel (upload through the Back4App dashboard or the `b4a` CLI), and `develop` and `main` share the same Back4App backend. Be careful before uploading.
- We have not yet confirmed that our Back4App plan allows outbound HTTP calls to Gemini. This is the first thing we test in phase 5. If it fails, the same Node logic moves to a Vercel serverless function.
- Gemini free-tier limits and terms can change. Check them when we set up. Only quiz prompts and the sign list are sent, never user account data.
- The Gemini key lives only in Back4App environment settings, never in the repo or browser.

## 4. Architecture

```
React (Vercel)
  |-- Parse SDK --> Back4App: users, Sign, Quiz, QuizResult, Progress
  |-- Parse.Cloud.run("generateQuiz") --> Cloud Code --> Gemini API
```

- The chat widget sends the conversation to `generateQuiz`.
- Cloud Code requires a logged-in user, rate-limits per user, and calls Gemini with the quiz schema and `quiz.md`.
- Gemini returns structured JSON. Cloud Code validates it against the schema and rejects any `signId` that is not in the sign library, so the model cannot invent signs.
- The quiz is returned to the browser, played in the quiz player, and can be saved to the `Quiz` class.

## 5. Data model (Parse classes)

- **Sign** (exists): `label`, `pixels`
- **Quiz**: `owner` (pointer to user), `title`, `questions` (array), `source` (`static` or `ai`)
- **QuizResult**: `user`, `quiz`, `score`, `total`, `answers`, timestamp
- **Progress**: `user`, `signsLearned[]`, `historyRead[]`, `quizzesTaken`

Security: private ACLs and class-level permissions, so each user reads and writes only their own rows. Guests can take quizzes and see the score; saving requires login.

How Progress gets filled: a "mark as learned" action on signs, history facts marked read, and quiz completion updating counts.

## 6. Quiz format

`quiz.json` stays the contract. Existing `radio` questions keep working, and we add:

- `sign-to-letter`: shows an animated sign, asks what it is
- `letter-to-sign`: gives a letter or word, offers several animations

Each sign question references a `signId` from the sign library. `quiz.md` documents this schema and lists the available sign IDs. It is what we feed the LLM.

## 7. Animated sign library

- `signLibrary.json` manifest per entry: `id`, `label`, `category`, `media` (webp, gif or mp4), `description`, `hasMotion`, `source`, `license`, `author`.
- Files live in `public/signs/` (downloaded, not hotlinked).
- A reusable `AnimatedSign` component with a pause control and support for reduced-motion settings.
- A Credits section on the page.
- Starting set: alphabet A-Z (J and Z properly animated), then common words if openly licensed ones exist.
- Do not scrape Lifeprint, SignASL, Giphy, or restrictive datasets. Verify each license before adding.

## 8. Phases

1. **Foundation and deploy**: fix the import case, move Parse keys to `VITE_*` env vars, add `vercel.json` with an SPA rewrite, deploy `main` and `develop`.
2. **Content pages**: Awareness page with real content, History category filter and expanded facts.
3. **Quiz player and data layer**: `/quiz` route, scoring, `Quiz`, `QuizResult`, `Progress`, "save my score", "mark as learned".
4. **Animated sign library**: manifest, assets with attribution, `AnimatedSign`, browse page, new question types.
5. **AI quiz builder**: test Gemini from Cloud Code first, then `generateQuiz` with validation, `quiz.md`, then the chat widget and saving generated quizzes.
6. **Polish**: README and CHANGELOG, accessibility, tests for scoring and validation, demo script.

## 9. Story coverage

| Story | Phase |
|---|---|
| 1 Progress | 3 |
| 2 QuizResult | 3 |
| 3 Take quiz, see score | 3 |
| 4 Awareness page | 2 |
| 5 History filter | 2 |
| 6 Vercel deploy | 1 |
| 7 AI quiz builder | 5 |
| 8 Animated sign quizzes | 4 (uses 3 and 5) |

## 10. Open items

- Confirm Back4App plan allows outbound calls from Cloud Code (phase 5 first step).
- Elijah to add Marcos as a Back4App collaborator, or confirm shared login use, and decide who holds the Gemini key.
- Find and license-check animation sources.
- Check whether the instructor requires Cloud Code specifically (we are using it).
- Split of work between Marcos and Elijah (to decide after partner stories are added).
