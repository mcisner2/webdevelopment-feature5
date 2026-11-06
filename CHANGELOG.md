# Changelog

## [0.3.0] - 2026-11-06
### Added
- Parse auth service (`authService.jsx`): `createUser`, `loginUser`, `checkUser`, `logoutUser`, and `getCurrentUser`
- Authentication module: menu page, register page, login page, and a shared auth form
- Protected route component, a `/home` gateway page, and a `/user` protected page with a log out button
- Routes for `/auth`, `/auth/register`, `/auth/login`, `/home`, and `/user`
- Navigation shows "My Account" only when a user is logged in

### Changed
- Moved the Signs, History, and authentication code under `src/Shared/Components`
- Removed the unused user and progress model files; authentication now goes through `authService.jsx`


## [0.2.0] - 2026-10-16
### Added
- React Router with Signs and History routes
- Parse models for Sign and User
- Component tree and data model diagrams
### Changed
- Converted HTM/Preact components to React JSX
- Vite config cleanup
