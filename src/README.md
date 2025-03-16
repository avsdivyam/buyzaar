# BuyZaar Frontend Architecture

This document outlines the architecture of the BuyZaar frontend application.

## Directory Structure

```
frontend/
│── public/                      # Static assets (index.html, favicon, etc.)
│── src/                          # Main source folder
│   ├── assets/                   # Images, fonts, icons, etc.
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── ProductCard.jsx       # Product display card
│   │   ├── Button.jsx            # Custom button component
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.js            # Keycloak authentication hook
│   ├── pages/                    # App pages
│   │   ├── Home.jsx              # Homepage
│   │   ├── Login.jsx             # Login page (Keycloak)
│   │   ├── ProductList.jsx       # Product listing
│   │   ├── ProductDetail.jsx     # Product details page
│   │   ├── Cart.jsx              # Shopping cart
│   │   ├── Checkout.jsx          # Checkout process
│   │   ├── Orders.jsx            # User order history
│   │   ├── NotFound.jsx          # 404 page
│   ├── redux/                     # State management (Redux Toolkit)
│   │   ├── store.js               # Redux store configuration
│   │   ├── slices/
│   │   │   ├── authSlice.js       # Authentication state
│   │   │   ├── cartSlice.js       # Shopping cart state
│   │   │   ├── productSlice.js    # Products state
│   ├── services/                  # API calls (Axios)
│   │   ├── api.js                 # API instance setup
│   │   ├── productService.js      # Product-related API calls
│   │   ├── authService.js         # Authentication API calls
│   │   ├── cartService.js         # Cart-related API calls
│   ├── styles/                    # Global styles (CSS)
│   │   ├── global.css             # Global CSS styles
│   ├── App.jsx                    # Main App component
│   ├── main.jsx                   # Entry point
│   ├── routes.jsx                 # React Router configuration
```

## Architecture Overview

### Components
Reusable UI components that can be used across multiple pages. These components are designed to be pure and focused on presentation.

### Hooks
Custom React hooks that encapsulate reusable logic. For example, `useAuth.js` handles Keycloak authentication.

### Pages
Each page represents a distinct view in the application. Pages compose components together and connect to the Redux store.

### Redux
State management using Redux Toolkit:
- `store.js`: Configures the Redux store
- `slices/`: Contains Redux slices for different domains (auth, cart, products)

### Services
API communication layer using Axios:
- `api.js`: Configures Axios with interceptors for authentication
- Domain-specific services for different API endpoints

### Styles
The application uses Tailwind CSS for styling:
- Utility-first CSS framework
- Responsive design out of the box
- Custom theme configuration in `tailwind.config.js`
- Extended with custom components in `src/styles/index.css`

### UI Libraries
- Heroicons for icons
- Bootstrap components are available but primarily using Tailwind for consistency

### Routing
React Router v7 for navigation between pages, with protected routes for authenticated users.

## Authentication Flow
The application uses Keycloak for authentication:
1. `useAuth` hook initializes Keycloak on app startup
2. Authentication state is stored in Redux
3. Protected routes check authentication status before rendering

## Data Flow
1. User interactions trigger Redux actions
2. Actions may call API services
3. API responses update Redux state
4. Components re-render based on state changes

## Build and Deployment
The application is built using Vite and can be deployed as a static site or within a Docker container.