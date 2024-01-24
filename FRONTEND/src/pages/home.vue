<template>
    <section class="text-center">
        <!-- <button class="btn btn-sm" @click="showAllRotue">ROUTE LIST</button>
        <p v-for="item in state.routelist">{{ item }}</p> -->
        <button class="tooltip btn btn-outline btn-sm rounded-none border-none group mb-5" @click="goGithub" :data-tip="t('GITHUB')">
            <img :src="github" alt="github" class="w-5 group-hover:invert" />
        </button>
        <p class="text-xl font-bold text-neutral-700 animate-bounce">Please visit my github page !</p>
    </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getEnv } from '../module/env'
import github from '/github.png?url'
const goGithub = () => (window.location.href = getEnv('VITE_GITHUB'))
const { t } = useI18n()
// import { reactive } from 'vue'
// import { router } from '../router/router'
// const state = reactive({
//     routelist: null as object[] | null,
// })
// const showAllRotue = () => (state.routelist = router.getRoutes())
</script>
