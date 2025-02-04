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
  data () {
    return {
      emailEntered: 10,
      resultMessage: null,
      }
  },
  methods: {
    //購読するクリック時の動作
    async subscribeSubmit() {
      try {
        const payload = {
          member_id: this.emailEntered
                }
        // post data
        const response = await this.$axios.$post(
          `/rcms-api/1/magazine_subscribe/1`, payload)
          this.resultMessage = response.messages[0]
      } catch (error) {
         this.resultMessage = error.response.data.errors[0].message
      }
    },
    //購読解除するクリック時の動作
    async unsubscribeSubmit() {
      try {
        const payload = {
                    member_id: this.emailEntered
                }
        // post data
        const response = await this.$axios.$post(
          `/rcms-api/1/magazine_unsubscribe/1`, payload)
          this.resultMessage = response.messages[0]
      } catch (error) {
         this.resultMessage = error.response.data.errors[0].message
      }
    },
  }
}
</script>
