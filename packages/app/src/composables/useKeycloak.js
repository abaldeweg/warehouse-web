import Keycloak from 'keycloak-js'
import { computed, ref } from 'vue'

export function useKeycloak(config) {
  const isAuthenticated = ref(false)
  const token = ref()
  const idToken = ref()
  const expired = computed(() => keycloak.isTokenExpired())
  const userInfo = ref()
  const userProfile = ref()

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
    isAuthenticated.value = authenticated
    token.value = keycloak.token
    idToken.value = keycloak.idToken

    keycloak.loadUserInfo().then((data) => {
      userInfo.value = data
    })
    keycloak.loadUserProfile().then((data) => {
      userProfile.value = data
    })
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

  return { isAuthenticated, token, idToken, expired, userInfo, userProfile, hasRole }
}
