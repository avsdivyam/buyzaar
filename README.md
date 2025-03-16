# BuyZaar E-Commerce Platform

BuyZaar is a modern e-commerce platform built with React.

## Project Structure

```
buyzaar/
│── public/                      # Static assets
│── src/                         # Main source folder
│   ├── assets/                  # Images, fonts, icons, etc.
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Custom hooks
│   ├── pages/                   # App pages
│   ├── redux/                   # State management (Redux Toolkit)
│   ├── services/                # API calls (Axios)
│   ├── styles/                  # Global styles (CSS)
│   ├── App.jsx                  # Main App component
│   ├── main.jsx                 # Entry point
│   ├── routes.jsx               # React Router configuration
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Styling

The application uses a custom CSS approach with a global stylesheet. The styles are defined in `src/styles/basic.css`.

## Features

- Product browsing and searching
- Shopping cart functionality
- User authentication with Keycloak
- Order management
- Responsive design

## Technologies Used

- React
- Redux Toolkit
- React Router
- Axios
- Keycloak for authentication# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
