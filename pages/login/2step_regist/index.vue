<template>
  <div v-if="!signupDone">
    <p v-if="error" :style="{ color: 'red' }">
      {{ error }}
    </p>
    <form @submit.prevent="signup">
      <div>
        <label>OTP</label>
        <input v-model="otp" name="otp" type="text" placeholder="otp">
      </div>
      <button type="submit">
        Sign up
      </button>
    </form>
    <div>
      <button @click.prevent="sendOTP">
        Send authentication code
      </button>
      <p v-if="sentOTP">
        One Time Password has been sent.
      </p>
    </div>
  </div>
  <div v-else>
    Registration has been completed.
  </div>
</template>

<script setup>
definePageMeta({
  validate: (route) => /[!-~]{32}/.test(String(route.query.key ?? ''))
})

const route = useRoute()
const signupDone = ref(false)
const sentOTP = ref(false)
const otp = ref('')
const error = ref(null)

async function sendOTP() {
  try {
    await $fetch('/rcms-api/1/set_and_send_otp', {
      method: 'POST',
      body: { email_hash: route.query.key },
    })
    sentOTP.value = true
  } catch (err) {
    error.value = err.data?.errors?.[0]?.message ?? 'An error occurred.'
  }
}

async function signup() {
  try {
    await $fetch('/rcms-api/1/check_otp_and_regist', {
      method: 'POST',
      body: { email_hash: route.query.key, otp: otp.value },
    })
    signupDone.value = true
  } catch (err) {
    error.value = err.data?.errors?.[0]?.message ?? 'An error occurred.'
  }
}
</script>
