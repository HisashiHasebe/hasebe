<template>
  <div>
    <p v-if="Status !== null" :style="{ color: resultMessageColor }">
      {{ resultMessage }}
    </p>
    <form v-if="!preloginStatus" @submit.prevent="prelogin">
      <input v-model="email" name="email" type="email" placeholder="email" />
      <input v-model="password" name="password" type="password" placeholder="password" />
      <button type="submit">ログイン</button>
    </form>
    <form v-if="preloginStatus" @submit.prevent="login">
      <input v-model="otp" name="otp" type="otp" placeholder="otp" />
      <button type="submit">送信</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      otp: '',
      Status: null,
      preloginStatus: false,
      resultMessage: null,
    };
  },
  computed: {
    resultMessageColor() {
      switch (this.Status) {
        case 'success':
          return 'green';
        case 'failure':
          return 'red';
        default:
          return '';
      }
    },
  },
  methods: {
    async prelogin() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.$axios.$post('/rcms-api/1/2step_pre_login', payload);
        this.Status = 'success';
        this.preloginStatus = true;
        this.resultMessage = 'ワンタイムパスワードを送付しました。';
      } catch (error) {
        this.Status = 'failure';
        this.resultMessage = 'ログインに失敗しました。';
      }
    },
    async login() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
          otp: this.otp,
        };
        await this.$axios.$post('/rcms-api/1/2step_login', payload);
        this.Status = 'success';
        this.resultMessage = 'ログインに成功しました。';
      } catch (error) {
        this.Status = 'failure';
        this.resultMessage = error.response.data.errors[0].message
      }
    },
  },
};
</script>
  