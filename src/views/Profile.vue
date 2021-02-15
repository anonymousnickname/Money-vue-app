<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>

      <div class="switch">
        <label>
          English
          <input
            type="checkbox"
            @change="selectLanguage"
            v-model="isRuLocale"
          />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <div class="switch">
        <label>
          {{ 'Light' | localize }}
          <input type="checkbox" @change="selectEvent" v-model="isDark" />
          <span class="lever"></span>
          {{ 'Dark' | localize }}
        </label>
      </div>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">{{ 'Name' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ 'Message_EnterName' | localize }}</small
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="number"
          v-model="bill"
          :class="{ invalid: $v.bill.$dirty && !$v.bill.required }"
        />
        <label for="description">{{ 'Bill' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.bill.$dirty && !$v.bill.required"
          >{{ 'Message_EnterName' | localize }}</small
        >
      </div>

      <button class="btn waves-effect waves-light btn-black-bcgr" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';
export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    };
  },
  data: () => ({
    name: '',
    bill: '',
    isRuLocale: true,
    isDark: ''
  }),
  validations: {
    name: { required },
    bill: { required }
  },
  mounted() {
    this.name = this.info.name;
    this.bill = this.info.bill;
    this.isRuLocale = this.$store.getters.locale === 'ru-RU';
    this.isDark = this.$store.getters.isDark;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          bill: this.bill
        });
        this.$message(localizeFilter('DataHasBeenUpdated'));
      } catch (e) {}
    },
    selectEvent() {
      this.$store.commit('setTheme', this.isDark);
      sessionStorage.setItem('setTheme', this.isDark);
    },
    selectLanguage() {
      const lanugage = this.isRuLocale === true ? 'ru-RU' : 'en-US';
      this.$store.commit('setLanguage', lanugage);
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
