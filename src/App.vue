<template>
  <v-app>
    <!-- <core-app-bar v-if="this.$store.state.showHeader" /> -->
    <core-app-bar v-if="showHeader" />
    <core-drawer />

    <core-view />

    <core-footer v-if="showFooter" />

    <!-- <core-cta /> -->
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    CoreCta: () => import('@/components/core/Cta'),
    CoreDrawer: () => import('@/components/core/Drawer'),
    CoreFooter: () => import('@/components/core/Footer'),
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import('@/components/core/View'),
  },

  computed: {
    showHeader () {
      if (this.$route.path.indexOf('author') != -1) {
        return this.$store.state.user
      } else if (this.$route.path.indexOf('edit') != -1) return false
      else return true
    },
    showFooter () {
      if (this.$route.path.indexOf('author') != -1) {
        return this.$store.state.user
      } else if (this.$route.path.indexOf('edit') != -1) return false
      else return true
    },
  },
}
</script>
<style>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>