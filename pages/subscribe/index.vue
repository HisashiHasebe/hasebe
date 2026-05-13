<template>
  <div>
    <form>
      <h1>マガジン登録</h1>
      <p v-if="resultMessage !== null">
        {{ resultMessage }}
      </p>
      <input name="email" type="email" placeholder="email">
      <button v-on:click.prevent="subscribeSubmit">購読する</button>
      <button v-on:click.prevent="unsubscribeSubmit">購読解除する</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailEntered: 10,
      resultMessage: null,
    }
  },
  methods: {
    async subscribeSubmit() {
      try {
        const payload = { member_id: this.emailEntered }
        const response = await $fetch('/rcms-api/1/magazine_subscribe/1', {
          method: 'POST',
          body: payload,
        })
        this.resultMessage = response.messages[0]
      } catch (error) {
        this.resultMessage = error.data?.errors?.[0]?.message
      }
    },
    async unsubscribeSubmit() {
      try {
        const payload = { member_id: this.emailEntered }
        const response = await $fetch('/rcms-api/1/magazine_unsubscribe/1', {
          method: 'POST',
          body: payload,
        })
        this.resultMessage = response.messages[0]
      } catch (error) {
        this.resultMessage = error.data?.errors?.[0]?.message
      }
    },
  },
}
</script>
