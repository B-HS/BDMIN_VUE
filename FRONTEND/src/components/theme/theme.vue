<template>
    <section>
        <button class="btn btn-outline btn-sm rounded-none border-none" @click="themeModal.show">
            <PaintBrushIcon class="w-5" />
        </button>
        <DraggableModal ref="themeModal" :title="'Theme'" key="thememodal">
            <section class="btns grid grid-cols-3 gap-3">
                <button
                    class="btn btn-outline"
                    v-for="item in Object.keys(daisyuiColors)"
                    :data-set-theme="getThemeName(item as DataThemeKeys)"
                    :data-theme="getThemeName(item as DataThemeKeys)"
                >
                    {{ getThemeName(item as DataThemeKeys) }}
                </button>
            </section>
        </DraggableModal>
    </section>
</template>
<script setup lang="ts">
import { PaintBrushIcon } from '@heroicons/vue/24/solid'
import daisyuiColors from 'daisyui/src/theming/themes'
import { themeChange } from 'theme-change'
import { onMounted, ref } from 'vue'
import DraggableModal from '../draggableModal.vue'

type ThemeKeys = keyof typeof daisyuiColors
type DataThemeKeys = Extract<ThemeKeys, `[data-theme=${string}]`>

const getThemeName = (name: DataThemeKeys) => name.split('[data-theme=')[1].split(']')[0]
const themeModal = ref()

onMounted(() => {
    themeChange(false)
})
</script>
