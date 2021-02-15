<template>
  <div>
    <div
      v-if="!$store.getters.rules"
      class="modal-help"
      :class="{ 'show-modal': showModal }"
    >
      <h4>Вам нужна помощь в авторизации?</h4>
      <div class="btn-wrapper" id="btn-wrapper">
        <button
          @click="() => handleModalWindow(false, false, null, 0, false)"
          class="btn-small btn btn-black-bcgr help-btn"
        >
          Да
        </button>
        <button
          class="btn-small btn btn-black-bcgr help-btn"
          @click="() => handleModalWindow(true, true, null, 24000, true, true)"
        >
          Нет
        </button>
      </div>
    </div>
    <div
      class="modal-help-accept-wrap"
      :class="{ 'hide-modal': hideModalAccept }"
    >
      <div class="modal-help-accept">
        <div
          @click="() => handleModalWindow(true, true, null, 10000, true)"
          class="cross"
        >
          &times;
        </div>
        <div class="login">
          <h2>Вход</h2>
          <div class="login_help_wrap">
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/login_email_field.png"
                  alt="login_help_image"
                />
              </div>
              <div class="login_help_text">
                1. Введите свою почту в это поле если вы уже имеете аккаунт.
                Если нет то перейдите на страницу
                <span
                  class="link-auth pointer"
                  @click="() => handleModalWindow(true, true, 'register', 10000, true)"
                  >реестрации</span
                >
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/login_password_field.png"
                  alt="login_help_image"
                />
              </div>
              <div class="login_help_text">
                2. Введите свой пароль от почты в это поле если вы уже имеете
                аккаунт. Если вы забыли, то сочувствую вам, у не было времени
                реализовать этот функционал.
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/login_enter_field.png"
                  alt="login_help_image"
                />
              </div>
              <div class="login_help_text">
                3. После того как вы заполнили все нужные поля - нажмите на эту
                кнопку.
              </div>
            </div>
          </div>
        </div>

        <div class="signup">
          <h2>Реестрация</h2>
          <div class="login_help_wrap">
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/register_email_field.png"
                  alt="register_email_image"
                />
              </div>
              <div class="login_help_text">
                1. Введите свою почту в это поле если у вас еще нету аккаунта.
                Если есть то перейдите на страницу
                <span
                  class="link-auth pointer"
                  @click="() => handleModalWindow(true, true, 'login', 10000, true)"
                  >входа</span
                >
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/register_password_field.png"
                  alt="register_password_image"
                />
              </div>
              <div class="login_help_text">
                2. Придумайте и введите свой пароль от почты в это поле.
                Старайтесь не забыбавать, так как потом зайти будет сложно.
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/register_name_field.png"
                  alt="register_name_image"
                />
              </div>
              <div class="login_help_text">
                3. В этом поле нужно ввести свое имя.
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/register_rules_field.png"
                  alt="register_rules_image"
                />
              </div>
              <div class="login_help_text">
                4. Не забудьте прочитать правила и подтвердить это.
              </div>
            </div>
            <div class="login_help_item">
              <div class="login_help_image">
                <img
                  src="../assets/img/register_button_field.png"
                  alt="register_button_image"
                />
              </div>
              <div class="login_help_text">
                5. После заполнения всех форм нажмите на эту кнопку.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpModal',
  data: () => ({
    showModal: false,
    hideModalAccept: true
  }),
  mounted() {
    setTimeout(() => {
      this.showModal = true;
    }, 4000);
  },
  methods: {
    handleModalWindow(
      showModal,
      hideModalAccept,
      routerPath = null,
      delay,
      isSetTimeout,
      noBtn = false
    ) {
      if (!isSetTimeout) {
        this.showModal = showModal;
        this.hideModalAccept = hideModalAccept;
        return;
      }

      if (noBtn) {
        this.showModal = !noBtn;
      }

      this.hideModalAccept = hideModalAccept;

      if (routerPath) {
        this.$router.push(`/${routerPath}`);
      }
      setTimeout(() => {
        this.showModal = showModal;
      }, delay);
    }
  }
};
</script>

<style scoped>
.modal-help {
  display: none;
  position: absolute !important;
  right: 20px;
  bottom: 20px;
  width: 400px;
  height: 180px;
  position: relative;
  background: #ffffff;
  border-radius: 25px;
  color: #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: 3s infinite alternate slidein;
  animation-iteration-count: 1;
}

@keyframes slidein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
.show-modal {
  display: block;
}
.modal-help-accept-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-help-accept {
  width: 80%;
  height: 90%;
  background: #fff;
  position: relative;
  display: flex;
}
.cross {
  position: absolute;
  right: 2%;
  top: 0%;
  font-size: 40px;
  color: #000;
  cursor: pointer;
}
.modal-help-accept::before {
  content: '';
  display: block;
  height: 100%;
  width: 1px;
  background: #000;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.login,
.signup {
  width: 50%;
}

.signup {
  overflow-y: scroll;
}

.login h2,
.signup h2 {
  text-align: center;
}
.login_help_item {
  height: 175px;
  width: 90%;
  margin: 10px auto;
  display: flex;
}
.login_help_image {
  flex: 0.45;
  overflow: hidden;
}
.login_help_image img {
  max-width: 100%;
}
.login_help_text {
  flex: 0.55;
  padding: 30px 20px;
}

.hide-modal {
  display: none;
}

::-webkit-scrollbar {
  width: 10px;
  height: 20px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
