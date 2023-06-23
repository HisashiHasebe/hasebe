<template>
    <div>
        <div v-if="!presignupDone">
            <form @submit.prevent="signup">
                <p v-if="error" :style="{ color: 'red' }">
                    {{ error }}
                </p>

                <div>
                    <label>name</label>
                    <input v-model="user.name" name="name" type="text" placeholder="name">
                </div>
                <div>
                    <label>tel</label>
                    <input v-model="user.tel" name="tel" type="text" placeholder="tel">
                </div>
                <div>
                    <label>email</label>
                    <input v-model="email" name="email" type="email" placeholder="email">
                </div>
                <div>
                    <label>login_pwd</label>
                    <input v-model="user.login_pwd" name="login_pwd" type="password" placeholder="login_pwd">
                </div>

                <div>
                    <button type="submit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
        <div v-else-if="presignupDone">
            Pre-registration is complete. Please check your email.
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            presignupDone: false,
            email: null,
            user: {},
            error: null
        }
    },
    methods: {
        async signup() {
            try {
                const payload = {
                    email: this.email,
                    ext_info: {
                        ...this.user
                    },
                }
                // post data
                // New Member Registration Request
                await this.$axios.$post('/rcms-api/1/2step_member_invite', payload)
                this.presignupDone = true
            } catch (e) {
                console.error(e)
                this.error = 'An error has occurred.'
            }
        },
    },
}
</script>