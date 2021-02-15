<template>
  <div class="empty-layout">
    <HelpModal />
    <RulesModal v-if="isRulesShow" />

    <div class="center-empty-form">
      <router-view />
    </div>
  </div>
</template>

<script>
import messages from '@/utils/messages';
import RulesModal from '@/components/RulesModal';
import HelpModal from '@/components/HelpModal';
export default {
  components: { RulesModal, HelpModal },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isRulesShow() {
      return this.$store.getters.rules;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    }
  }
};
</script>

<style scoped>
.empty-layout {
  background-image: url('../assets/img/backround-empty-layout.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
