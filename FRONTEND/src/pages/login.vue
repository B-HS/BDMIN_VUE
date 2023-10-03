<template>
    <section class="h-screen flex items-center justify-center">
        <div class="flex flex-col justify-center gap-5 w-full max-w-lg">
            <span class="text-3xl">{{ title }}</span>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                    v-model="state.email"
                    type="text"
                    placeholder="Email"
                    class="input input-bordered"
                    :class="[{ 'input-error': state.isEmail }]"
                />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input v-model="state.pw" type="text" placeholder="Password" class="input input-bordered" :class="[{ 'input-error': state.isPw }]" />
            </div>

            <div>
                <button type="submit" class="btn btn-primary w-full" @click="login">Login</button>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { getEnv } from '../module/env'
import { useUserStore } from '../store/modules/user'

const title = getEnv('VITE_APP_TITLE')
const state = reactive({
    email: '',
    pw: '',
    isEmail: false,
    isPw: false,
})
const login = () => {
    state.isEmail = !state.email
    state.isPw = !state.pw
    if (!state.isEmail && !state.isPw) {
        useUserStore().login(state.email, state.pw)
    }
}
</script>
