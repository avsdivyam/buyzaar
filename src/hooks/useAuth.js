import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

const useAuth = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // First check if we have a token in localStorage (for "remember me" functionality)
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
          try {
            // In a real app, you would validate the token with the server
            // const userData = await authService.getProfile();

            // For demo purposes, we'll just simulate a valid token
            const mockUserData = {
              id: '12345',
              firstName: 'John',
              lastName: 'Doe',
              email: 'user@example.com',
              roles: ['user']
            };

            dispatch(login({
              token: storedToken,
              user: mockUserData
            }));
          } catch (error) {
            console.error('Stored token is invalid:', error);
            localStorage.removeItem('authToken');
          }
        }

        // Initialize Keycloak for SSO
        try {
          const keycloakInstance = new Keycloak({
            url: import.meta.env.VITE_KEYCLOAK_URL || 'http://3.6.134.85:8080',
            realm: import.meta.env.VITE_KEYCLOAK_REALM || 'buyzaar',
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'buyzaar-client'
          });

          const authenticated = await keycloakInstance.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256'
          });

          setKeycloak(keycloakInstance);

          if (authenticated) {
            dispatch(login({
              token: keycloakInstance.token,
              user: {
                id: keycloakInstance.subject,
                username: keycloakInstance.tokenParsed.preferred_username,
                email: keycloakInstance.tokenParsed.email,
                roles: keycloakInstance.tokenParsed.realm_access.roles
              }
            }));
          }

          keycloakInstance.onTokenExpired = () => {
            keycloakInstance.updateToken(30).catch(() => {
              dispatch(logout());
              localStorage.removeItem('authToken');
            });
          };
        } catch (error) {
          console.error('Failed to initialize Keycloak:', error);
          // Continue without Keycloak
        }
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [dispatch]);

  const logoutUser = () => {
    // Clear local storage
    localStorage.removeItem('authToken');

    // Logout from Keycloak if available
    if (keycloak && keycloak.authenticated) {
      keycloak.logout();
    }

    // Dispatch logout action
    dispatch(logout());
  };

  return { keycloak, initialized, logoutUser };
};

export default useAuth;