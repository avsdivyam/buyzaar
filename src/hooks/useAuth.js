import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

const useAuth = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const keycloakInstance = new Keycloak({
          url: import.meta.env.VITE_KEYCLOAK_URL,
          realm: import.meta.env.VITE_KEYCLOAK_REALM,
          clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
        });

        const authenticated = await keycloakInstance.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          pkceMethod: 'S256'
        });

        setKeycloak(keycloakInstance);
        setInitialized(true);

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
          });
        };

      } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
        setInitialized(true);
      }
    };

    initKeycloak();
  }, [dispatch]);

  return { keycloak, initialized };
};

export default useAuth;