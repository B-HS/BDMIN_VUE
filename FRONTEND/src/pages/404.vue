<template>
    <section>
        <h1>404</h1>
        <span>{{ t('404') }}</span>
        <button class="btn" @click="() => router.back()">{{ t('GOBACK') }}</button>
    </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { router } from '../router/router'

const { t } = useI18n()
</script>
