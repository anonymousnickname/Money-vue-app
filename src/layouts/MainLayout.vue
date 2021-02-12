<template>
  <div>
    <div v-if="loading" class="center-own">
      <Loader />
    </div>
    <div class="app-main-layout" v-else>
      <Navbar :isDark="isDark" :isMenuOpen="isOpen" @click="isOpen = !isOpen" />

      <Sidebar :isDark="isDark" v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'">
        <router-link
          class="btn-floating btn-large black flow-btn"
          to="/record"
          v-tooltip="'CreateNewRecord'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';
import messages from '@/utils/messages';
export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (sessionStorage.getItem('setTheme')) {
      this.$store.commit('setTheme', !!sessionStorage.getItem('setTheme'));
    }

    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
    isDark() {
      return this.$store.getters.isDark;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    }
  }
};
</script>
