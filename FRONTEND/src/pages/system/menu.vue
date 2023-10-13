<template>
    <section>
        <Card>
            <input value="" />
        </Card>
        <DraggableModal ref="dgModal" />
        <button @click="dgModal.show">SHOW</button>
        <button @click="dgModal.close">HIDE</button>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Card from '../../components/card.vue'
import DraggableModal from '../../components/draggableModal.vue'
const dgModal = ref()
</script>
