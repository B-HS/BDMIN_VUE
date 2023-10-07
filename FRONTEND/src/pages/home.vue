import { router } from '../router/router';
<template>
    <section>
        <button class="btn btn-sm" @click="showAllRotue">ROUTE LIST</button>
        <p v-for="item in state.routelist">{{ item }}</p>
    </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { router } from '../router/router'
const state = reactive({
    routelist: null as object[] | null,
})
const showAllRotue = () => {
    console.log(router.getRoutes())
    state.routelist = router.getRoutes()
}
</script>
