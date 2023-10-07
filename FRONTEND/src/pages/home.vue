import { router } from '../router/router';
<template>
    <section>
        <span>hello</span>
        <button
            class="btn"
            @click="
                () => {
                    console.log(router.getRoutes())
                }
            "
        >
            show current route
        </button>
        <button class="btn" @click="() => router.push('/system/main')">go main</button>
    </section>
</template>
<script setup lang="ts">
import { router } from '../router/router'
</script>
