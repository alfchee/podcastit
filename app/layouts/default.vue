<template>
  <v-app dark>
    <!-- Applicaton Nav bar -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <div v-if="isAuth">
        <v-btn text to="/dashboard" nuxt exact>Dashboard</v-btn>
        <v-btn text to="/dashboard/episodes" nuxt exact>Episodes</v-btn>
      </div>

      <v-btn v-if="!isAuth" text @click.stop="login"> Sign In </v-btn>
      <v-btn v-if="isAuth" text @click.stop="logout"> Logout </v-btn>
    </v-app-bar>
    <!-- End of Application Nav bar -->

    <!-- Content goes here -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Footer section -->
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- End of Footer -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Podcastit',
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },

  watch: {
    '$auth.isAuthenticated'(newVal) {
      if (newVal) {
        this.$router.push({ path: '/dashboard' })
      }
    },
  },

  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>
