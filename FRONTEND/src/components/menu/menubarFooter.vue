<template>
    <footer class="absolute bottom-1 p-3 flex gap-1 justify-between w-full items-center">
        <span class="font-bold"></span>
        <section class="icons flex">
            <button class="tooltip btn btn-outline btn-sm rounded-none border-none group" @click="goGithub" :data-tip="t('GITHUB')">
                <img :src="github" alt="github" class="w-5 group-hover:invert" />
            </button>
            <Theme />
        </section>
    </footer>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getEnv } from '../../module/env'
import Theme from '../theme/theme.vue'
import github from '/github.png?url'
const goGithub = () => (window.location.href = getEnv('VITE_GITHUB'))
const { t } = useI18n()
</script>
