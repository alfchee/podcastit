/* eslint-disable nuxt/no-globals-in-created */
import Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

let auth0Client

const getAuth0Client = async () => {
  if (auth0Client) {
    return auth0Client
  }

  try {
    auth0Client = await createAuth0Client({
      domain: 'dev-podcastit.us.auth0.com',
      client_id: 'guhPMy5YoDevhP0MfyawoFb4qIXoEDVU',
      redirect_uri: window.location.origin,
      cacheLocation: 'localstorage',
    })

    return auth0Client
  } catch (err) {
    console.log(`ERROR: ${err.message}`)
  }
}

// the instance is a Vue object
const auth = new Vue({
  data() {
    return {
      loading: true,
      isAuthenticated: false,
      user: {},
      auth0Client: null,
      popupOpen: false,
      error: null,
    }
  },

  /** Use this lifecycle method to instantiate the SDK client */
  async created() {
    try {
      this.auth0Client = await getAuth0Client()

      // If the user is returning to the app after authentication..
      if (
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        // handle the redirect and retrieve tokens
        const { appState } = await this.auth0Client.handleRedirectCallback()

        // Notify subscribers that the redirect callback has happened, passing the appState
        // (useful for retrieving any pre-authentication state)
        DEFAULT_REDIRECT_CALLBACK(appState)
      }
    } catch (err) {
      //   this.error = err
    } finally {
      // Initialize our internal authentication state
      this.isAuthenticated = await this.auth0Client.isAuthenticated()
      this.user = await this.auth0Client.getUser()
      this.loading = false
    }
  },

  methods: {
    /**
     * Authenticates the user using a popup window
     * @param {*} options
     * @param {*} config
     */
    async loginWithPopup(options, config) {
      this.popupOpen = true

      try {
        await this.auth0Client.loginWithPopup(options, config)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      } finally {
        this.popupOpen = false
      }

      this.user = await this.auth0Client.getUser()
      this.isAuthenticated = true
    },

    /** Authenticates the user using the redirect method */
    loginWithRedirect(o) {
      return this.auth0Client.loginWithRedirect(o)
    },

    /**
     * Handles the callback when logging in using a redirect
     */
    async handleRedirectCallback() {
      this.loading = true

      try {
        await this.auth0Client.handleRedirectCallback()
        this.user = await this.auth0Client.getUser()
        this.isAuthenticated = true
      } catch (err) {
        this.error = err
        // eslint-disable-next-line
        console.error(err);
      } finally {
        this.loading = false
      }
    },

    /**
     * Returns all the claims present in the ID token
     * @param {*} o
     */
    getIdTokenClaims(o) {
      return this.auth0Client.getIdTokenClaims(o)
    },

    /**
     * Returns the access token. If the token is invalid or missing, a new one is retrieved
     * @param {*} o
     */
    getTokenSilently(o) {
      return this.auth0Client.getTokenSilently(o)
    },

    /**
     * Gets the access token using a popup window
     * @param {*} o
     */
    getTokenWithPopup(o) {
      return this.auth0Client.getTokenWithPopup(o)
    },

    /**
     * Logs the user out and removes their session on the authorization server
     * @param {*} o
     */
    logout(o) {
      return this.auth0Client.logout(o)
    },
  },
})

export default ({ store }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('auth', auth)
}
