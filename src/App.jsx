import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import createRoutes from './routes.jsx';
import useAuth from './hooks/useAuth';

function App() {
  const { initialized } = useAuth();
  const { isAuthenticated } = useSelector(state => state.auth);

  // Create routes with authentication state
  const router = createRoutes(isAuthenticated);

  // Wait for authentication to initialize before rendering
  if (!initialized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #3498db',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '1rem' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
