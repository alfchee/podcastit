export default ({ $auth, store }) => {
  // if (process.client) {
  if (!$auth.isAuthenticated) {
    $auth.loginWithRedirect()
  } else {
    store.dispatch('auth/setUser', $auth.user)
  }
  // }
}
