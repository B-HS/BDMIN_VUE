<template>
    <dialog ref="draggableModal" class="modal">
        <div class="modal-box p-0">
            <section
                ref="modalheader"
                class="modal-header flex justify-between p-5 select-none"
                @mousedown="startDrag"
                @mousemove="drag"
                @mouseup="stopDrag"
            >
                <h3 class="font-bold text-xl">{{ props.title }}</h3>
                <button><XMarkIcon class="w-7" @click="close" /></button>
            </section>

            <section class="modal-body p-5 px-7">
                <slot></slot>
            </section>

            <section class="modal-footer px-5 py-3 flex justify-end" v-if="props.footer">
                <button v-for="item in props.footer" :key="item.name" :class="['btn', item.class, `btn-${item.type}`]" @click="item.fn">
                    {{ item.name }}
                </button>
            </section>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button></button>
        </form>
    </dialog>
</template>
<script setup lang="ts" generic="T extends string | number, U extends { footer: T[] | U; body: T | U }">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { reactive, ref } from 'vue'

const draggableModal = ref()
const modalheader = ref()
const props = defineProps<{ title?: string; footer?: { name: string; type: string; fn: Function; class?: string }[] }>()
const show = () => draggableModal.value.showModal()
const close = () => draggableModal.value.close()
const modalStatus = reactive({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
})

const startDrag = (event: MouseEvent) => {
    modalStatus.isDragging = true
    modalStatus.offsetX = event.clientX - draggableModal.value.getBoundingClientRect().left
    modalStatus.offsetY = event.clientY - draggableModal.value.getBoundingClientRect().top
    window.addEventListener('mousemove', drag)
}

const drag = (event: MouseEvent) => {
    if (modalStatus.isDragging) {
        const x = event.clientX - modalStatus.offsetX
        const y = event.clientY - modalStatus.offsetY
        draggableModal.value.style.left = `${x}px`
        draggableModal.value.style.top = `${y}px`
    }
}

const stopDrag = () => {
    modalStatus.isDragging = false
    window.removeEventListener('mousemove', drag)
}

defineExpose({ show, close })
</script>
