<template>
  <div class="modal-help">
    <h4>Вам нужна помощь в авторизации?</h4>
    <div class="btn-wrapper" id="btn-wrapper">
      <button class="btn-small btn btn-black-bcgr help-btn">Да</button>
      <button class="btn-small btn btn-black-bcgr help-btn">Нет</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpModal',
  data: () => ({
    counter: 0
  }),
  mounted() {
      setInterval(()=> {
        if (this.counter < 300) {
          this.counter++;
          console.log('setTimeout() executed, counter=' + this.counter);
          console.log(document.getElementById('btn-wrapper').style);
          document
            .getElementById('btn-wrapper').setAttribute("style", `right: ${this.counter}px`);
        }
      }, 1000);
  },
  methods: {
    showModal() {
    
    }
  }
};
</script>

<style scoped>
.modal-help {
  position: absolute !important;
  right: 0;
  bottom: 100px;
  width: 400px;
  height: 180px;
  position: relative;
  background: #ffffff;
  border-radius: 25px;
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.modal-help h4 {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  font-size: 18px;
}
.btn-wrapper {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.help-btn {
  margin-right: 20px;
}
</style>
