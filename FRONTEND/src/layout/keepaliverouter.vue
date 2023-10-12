<template>
    <RouterView v-slot="{ Component, route }">
        <!-- 각 컴포넌트에 sciprt문이 하나도 없을경우 keepalive 셋팅이 불가능해보임 -->
        <!-- 당장 Card하나 임포트하고 keepalive 실행해보니 너무나 잘됨 -->
        <Transition name="scale" mode="out-in">
            <KeepAlive :include="cachedView">
                <component :is="Component" :key="route.fullPath" />
            </KeepAlive>
        </Transition>
    </RouterView>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useTabStoreWithoutInit } from '../store/modules/tab'

const cachedView = computed(() => useTabStoreWithoutInit().getCacheList())
</script>
<style>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.125s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
