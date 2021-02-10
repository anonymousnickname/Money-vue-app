<template>
  <div class="rules_wrap">
    <div class="rules">
      <div class="cross" @click="closeRulesModal">&times;</div>
      <h2>{{ 'Rules' | localize }}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fuga
        aperiam magni tempora nulla ex eius vel, ut neque expedita.
        Exercitationem, odio magni. In qui corporis voluptas excepturi ratione
        quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fuga
        aperiam magni tempora nulla ex eius vel, ut neque expedita.
        Exercitationem, odio magni. In qui corporis voluptas excepturi ratione
        quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fuga
        aperiam magni tempora nulla ex eius vel, ut neque expedita.
        Exercitationem, odio magni. In qui corporis voluptas excepturi ratione
        quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fuga
        aperiam magni tempora nulla ex eius vel, ut neque expedita.
        Exercitationem, odio magni. In qui corporis voluptas excepturi ratione
        quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fuga
        aperiam magni tempora nulla ex eius vel, ut neque expedita.
        Exercitationem, odio magni. In qui corporis voluptas excepturi ratione
        quas.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules',
  methods: {
    closeRulesModal() {
      this.$store.commit('setRules', false)
    }
  }
};
</script>

<style scoped>
.rules {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  width: 500px;
  background: white;
  padding: 10px 15px;
}

.rules h2 {
  text-align: center;
}

.rules_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: black;
  z-index: 1000000
}

.cross {
  text-align: end;
  font-size: 45px;
  position: relative;
  top: -15px;
  cursor: pointer;
}
</style>
