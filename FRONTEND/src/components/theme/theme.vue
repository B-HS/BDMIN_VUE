<template>
    <section>
        <button class="tooltip btn btn-outline btn-sm rounded-none border-none" @click="themeModal.show" data-tip="Themes">
            <PaintBrushIcon class="w-5" />
        </button>
        <DraggableModal ref="themeModal" :title="'Theme'" key="thememodal">
            <section class="grid grid-cols-3 gap-3">
                <section
                    class="btns py-2 p-5 border-1 border-black border rounded"
                    v-for="item in Object.keys(daisyuiColors)"
                    :data-theme="getThemeName(item as DataThemeKeys)"
                >
                    <button class="btn btn-outline w-full" :data-set-theme="getThemeName(item as DataThemeKeys)">
                        {{ getThemeName(item as DataThemeKeys) }}
                    </button>
                </section>
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
