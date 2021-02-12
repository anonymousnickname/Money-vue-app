<template>
  <nav class="navbar lighten-1" :class="{ black: isDark, white: !isDark }">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('click')"
          :class="{ 'black-text': !isDark }"
        >
          <i class="material-icons ">dehaze</i>
        </a>
        <span
          class="pointer"
          :class="{ 'black-text': !isDark, 'white-text': isDark }"
          @click="changeDateType"
          >{{ date | date(dateType) }}</span
        >
      </div>
      <div class="navbar-center bottom-30 ">
        <h5
          @click="isOpen = !isOpen"
          :class="{ 'black-text': !isDark, none: !isOpen, blackArrow: !isDark }"
        >
          {{ bill | currency('UAH') }}
        </h5>
        <span
          @click="isOpen = !isOpen"
          v-if="!isOpen"
          class="money "
          :class="{ moneyBlack: !isDark }"
        ></span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger"
            :class="{ 'black-text': !isDark }"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right" :class="{ ' white-text': isDark }"
              >arrow_drop_down</i
            >
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" :class="{ 'black-text': !isDark }">
                <i class="material-icons">account_circle</i>
                {{ 'ProfileTitle' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a
                href="#"
                :class="{ 'black-text': !isDark }"
                @click.prevent="logout"
              >
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
    dropdown: null,
    isOpen: true,
    dateType: 'datetime',
    countDate: 1
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
    },
    changeDateType() {
      this.countDate++;
      if (this.countDate === 4) {
        this.countDate = 1;
      }

      if (this.countDate === 1) {
        this.dateType = 'datetime';
      }

      if (this.countDate === 2) {
        this.dateType = 'time';
      }

      if (this.countDate === 3) {
        this.dateType = 'date';
      }
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

<style scoped>
.none {
  display: none;
}
.bottom-30 {
  padding-top: 30px;
  cursor: pointer;
}

.bottom-30 h5:after {
  content: '';
  position: absolute;
  left: 170px;
  bottom: 10px;
  border: 7px solid transparent; /* Прозрачные границы */
  border-top: 7px solid white; /* Добавляем треугольник */
}

.blackArrow::after {
  border-top-color: black !important;
}

.money {
  content: '';
  display: block;
  background-image: url('../../assets/img/piggy-bank-with-dollar-coin.svg');
  width: 50px;
  height: 50px;
  background-size: 50px;
  cursor: pointer;
}

.moneyBlack {
  background-image: url('../../assets/img/piggy-black-bank-with-dollar-coin.svg');
}
</style>
