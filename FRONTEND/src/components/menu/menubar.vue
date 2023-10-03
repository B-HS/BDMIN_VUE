<template>
    <section
        class="h-screen bg-base-200 transition-all overflow-hidden"
        :style="{ width: useAppstore().getMenuHide() ? '0px' : useAppstore().getMenubarWidth() + 'px' }"
    >
        <header class="bg-base-neutral-content p-3 text-center text-xl">
            {{ title }}
        </header>
        <ul class="menu bg-base-200 w-full">
            <li><a>Item 1</a></li>
            <li>
                <a>Parent</a>
                <ul>
                    <li><a>level 2 item 1</a></li>
                    <li><a>level 2 item 2</a></li>
                    <li>
                        <a>Parent</a>
                        <ul>
                            <li><a>level 3 item 1</a></li>
                            <li><a>level 3 item 2</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><a>Item 3</a></li>
        </ul>
    </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { getEnv } from '../../module/env'
import { useAppstore } from '../../store/modules/app'

const title = computed(() => getEnv('VITE_APP_TITLE')).value
</script>
