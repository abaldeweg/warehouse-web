import Keycloak from 'keycloak-js'
import { ref } from 'vue'

export function useKeycloak(config) {
  const token = ref()
  const idToken = ref()
  const userInfo = ref()
  const isAuthenticated = ref(false)

  const keycloak = new Keycloak({
    url: config.url,
    realm: config.realm,
    clientId: config.clientId
  });

  keycloak.init({
    onLoad: "login-required",
    pkceMethod: 'S256',
    redirectUri: config.redirectUri,
    checkLoginIFrame: false
  }).then((authenticated) => {
    token.value = keycloak.token
    idToken.value = keycloak.idToken
    userInfo.value = keycloak.userInfo
    userProfile.value = keycloak.userProfile
    isAuthenticated.value = authenticated

  }).catch((error) => {
    console.error('Failed to initialize adapter: ', error);
  })

  const refresh = async () => {
    try {
      await keycloak.updateToken(30);
    } catch (error) {
      console.error('Failed to refresh token: ', error);
    }
  }

  const hasRole = (role) => {
    return keycloak.hasRealmRole(role)
  }

  const expired = () => {
    return keycloak.isTokenExpired()
  }

  return { token, idToken, userInfo, hasRole, expired }
}
