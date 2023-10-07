<template>
    <section>
        <h1>404</h1>
        <span>Page not found</span>
        <button class="btn" @click="() => router.back()">Go back</button>
    </section>
</template>
<script setup lang="ts">
import { router } from '../router/router'
</script>
