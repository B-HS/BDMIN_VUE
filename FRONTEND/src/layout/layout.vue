<template>
    <section v-if="!router.currentRoute.value.meta.isAuthed">
        <RouterView />
    </section>
    <section class="flex items-start" v-else>
        <Menubar />
        <section class="flex-1">
            <Navibar />
            <Tab />
            <section class="p-3">
                <RouterView v-slot="{ Component, route }">
                    <!-- <KeepAlive :include="cachable"> -->
                    <!-- TODO inlcude넣으면 캐싱이 안되는 버그가 있음 -->
                    <!-- 몇일 더 찾아보고 안되면 issue하나 올리기 -->
                    <KeepAlive>
                        <component :is="Component" :key="route.fullPath" />
                    </KeepAlive>
                </RouterView>
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">
import Menubar from '../components/menu/menubar.vue'
import Navibar from '../components/navigator/navibar.vue'
import Tab from '../components/navigator/tab.vue'
import { router } from '../router/router'

// const cachable = router
//     .getRoutes()
//     .filter((val) => val.meta.cache)
//     .map((val) => val.name) as string[]
</script>
