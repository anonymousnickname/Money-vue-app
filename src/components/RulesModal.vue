<template>
  <div id="myModal" class="modal_wrap">
    <div class="modal-content">
      <span class="close" @click="closeRulesModal">&times;</span>
      <h1>{{ 'Rules' | localize }}</h1>
      <ul>
        <ol>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
            blanditiis architecto illo sit magni suscipit natus quam mollitia
            eveniet. Perferendis quia quisquam voluptate non. Qui iste ipsum hic
            in molestiae.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
            blanditiis architecto illo sit magni suscipit natus quam mollitia
            eveniet. Perferendis quia quisquam voluptate non. Qui iste ipsum hic
            in molestiae.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
            blanditiis architecto illo sit magni suscipit natus quam mollitia
            eveniet. Perferendis quia quisquam voluptate non. Qui iste ipsum hic
            in molestiae.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
            blanditiis architecto illo sit magni suscipit natus quam mollitia
            eveniet. Perferendis quia quisquam voluptate non. Qui iste ipsum hic
            in molestiae.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro,
            blanditiis architecto illo sit magni suscipit natus quam mollitia
            eveniet. Perferendis quia quisquam voluptate non. Qui iste ipsum hic
            in molestiae.
          </li>
        </ol>
      </ul>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
        maiores rem dolores iste sapiente beatae eum! Vitae eveniet odit fuga,
        reprehenderit incidunt soluta nam, assumenda neque repellat dignissimos
        maiores illo. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Facere, maiores rem dolores iste sapiente.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RulesModal',
  methods: {
    closeRulesModal() {
      const { commit } = this.$store;
      commit('setRules', false);
    }
  }
};
</script>

<style scoped>
.modal_wrap {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  min-height: 50vh;
}
.modal-content h1 {
  text-align: center;
}

.modal-content p {
  padding: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
