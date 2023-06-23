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
    <div v-else-if="signupDone">
        Registration has been completed.
    </div>
</template>

<script>
export default {
    validate({ query }) {
        return /[!-~]{32}/.test(query.key)
    },
    data() {
        return {
            signupDone: false,
            sentOTP: false,
            otp: "",
            error: null
        }
    },
    methods: {
        async sendOTP() {
            try {
                const payload = {
                    email_hash: this.$route.query.key
                }
                await this.$axios.post('/rcms-api/1/set_and_send_otp', payload);
                this.sentOTP = true
            } catch (error) {
                this.error = error.response.data.errors[0].message
            }
        },
        async signup() {
            try {
                const payload = {
                    email_hash: this.$route.query.key,
                    otp: this.otp
                }
                await this.$axios.post('/rcms-api/1/check_otp_and_regist', payload);
                this.signupDone = true
            } catch (error) {
                this.error = error.response.data.errors[0].message
            }
        }
    },
}
</script>