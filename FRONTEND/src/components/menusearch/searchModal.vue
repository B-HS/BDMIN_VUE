<template>
    <DraggableModal title="SEARCH" ref="searchModal">
        <input v-model="state.searchValue" type="text" class="input input-bordered w-full mb-5" />
        <section class="flex flex-col gap-3">
            <div
                class="breadcrumbs border rounded p-3 hover:bg-base-300 transition-all"
                v-for="bread in searchedList"
                :key="bread.path"
                @click="() => go(bread.path)"
            >
                <ul>
                    <li
                        class="overflow-hidden cursor-pointer"
                        v-for="item in findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], bread.name as string)"
                        :key="item"
                    >
                        <span class="normal-case text-xl font-bold">{{ item }}</span>
                    </li>
                </ul>
            </div>
        </section>
    </DraggableModal>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { findBreadcrumbPath } from '../../module/breadCrumble'
import { router } from '../../router/router'
import { useUserStore } from '../../store/modules/user'
import { MenuItem } from '../../types/user'
import DraggableModal from '../draggableModal.vue'

const searchModal = ref()
const state = reactive({
    searchValue: '',
})

const searchedList = computed(() =>
    router.getRoutes().filter(
        (route) =>
            (route.name?.toString().toUpperCase().includes(state.searchValue.toUpperCase()) ||
                route.meta?.title?.toString().toUpperCase().includes(state.searchValue.toUpperCase())) &&
            route.meta?.isAuthed &&
            route.path &&
            // @ts-ignore
            route.meta?.raw?.parentmekey &&
            route.meta?.hide === false,
    ),
)

const go = (path: string) => {
    router.push(path)
    searchModal.value.close()
}

defineExpose({ open: () => searchModal.value.show(), close: () => searchModal.value.close() })
</script>
