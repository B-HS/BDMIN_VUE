<template>
    <section>
        <button @click="draggableModal.showModal()">??</button>
        <dialog ref="draggableModal" class="modal">
            <div class="modal-box">
                <div ref="modalheader" class="modal-header">
                    <h3 class="font-bold text-lg">Hello!</h3>
                </div>
                <div class="divider"></div>
                <p>Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const draggableModal = ref()
const modalheader = ref()

const show = () => draggableModal.value.showModal()
const close = () => draggableModal.value.close()

defineExpose({ show, close })
</script>
