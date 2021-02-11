<template>
  <nav class="navbar lighten-1" :class="{black: isDark, white: !isDark}">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')" :class="{'black-text': !isDark}">
          <i class="material-icons " >dehaze</i>
        </a>
        <span  :class="{'black-text': !isDark, 'white-text': isDark}">{{ date | date('datetime') }}</span>
      </div>
      <h5  class="navbar-center" :class="{'black-text': !isDark}">{{ bill | currency('UAH') }}</h5>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger"
            :class="{'black-text': !isDark}"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right" :class="{' white-text': isDark}">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile"   :class="{'black-text': !isDark}">
                <i class="material-icons">account_circle</i>
                {{ 'ProfileTitle' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#"   :class="{'black-text': !isDark}" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ 'Exit' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  props: {
    isDark: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
    bill() {
      return this.$store.getters.info.bill;
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
};
</script>
