<template>
    <section class="h-full flex flex-col">
        <Card class="flex gap-2 justify-end">
            <button class="btn btn-primary btn-xs" @click="getTrtext">{{ t('SEARCH') }}</button>
            <button class="btn btn-primary btn-xs" @click="addRow">{{ t('ADD') }}</button>
            <button class="btn btn-primary btn-xs" @click="deleteRow">{{ t('DELETE') }}</button>
            <button class="btn btn-primary btn-xs" @click="handleExternalButtonClick">{{ t('SAVE') }}</button>
        </Card>
        <div
            class="w-full p-0 border-0 alert alert-success max-h-0 overflow-hidden transition-all flex justify-between"
            :class="[{ 'p-3': state.isSuccessedToast }, { 'max-h-fit': state.isSuccessedToast }, { 'my-2': state.isSuccessedToast }]"
        >
            <span>{{ t('SAVE_SUCCESS') }}</span>
            <XMarkIcon class="h-5" @click="() => (state.isSuccessedToast = false)" />
        </div>
        <div
            class="w-full p-0 border-0 alert alert-error max-h-0 overflow-hidden transition-all flex justify-between"
            :class="[{ 'p-3': state.isFailedToast }, { 'max-h-fit': state.isFailedToast }, { 'my-2': state.isFailedToast }]"
        >
            <span>{{ t('SAVE_FAIL') }}</span>
            <XMarkIcon class="h-5" @click="() => (state.isFailedToast = false)" />
        </div>
        <AGGrid
            class="ag-theme-alpine h-full"
            ref="grid"
            rowSelection="multiple"
            animateRows="true"
            @grid-ready="onGridReady"
            :columnDefs="columnDefs"
            :rowData="gridData"
            :overlayNoRowsTemplate="t('GRID_NO_DATA')"
        />
    </section>
</template>
<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { AgGridVue as AGGrid } from 'ag-grid-vue3'
import { ComputedRef, computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { deleteLocale, requestFullLocaleList, saveLocale } from '../../api/locale'
import Card from '../../components/card.vue'
import { locale } from '../../types/app'

interface column {
    field: keyof locale
    width: number
    headerName: string | ComputedRef<string>
    valueGetter: string | Function
    editable: boolean
}

interface rowData extends locale {
    trtext: string
    new: boolean | string
    updated: boolean | string
    deleted: boolean | string
}

interface gridData {
    addedRows: Partial<rowData>[]
    updatedRows: Partial<rowData>[]
    deletedRows: Partial<rowData>[]
    gridData: Partial<rowData>[]
    isFailedToast: boolean
    isSuccessedToast: boolean
}
const grid = ref()
const { t } = useI18n()
const ct = (str: string) => computed(() => t(str))

const addRow = () => {
    state.gridData = [...state.gridData, { new: true }]
}

const onUpdate = (param: any, own: string) => {
    if (!param.data.new) {
        param.data.updated = true
    }
    return param.data[own]
}

const deleteRow = () => {
    state.gridData[gridApi.getFocusedCell().rowIndex].deleted = true
}
const columnDefs = ref<Partial<column>[]>([
    { headerName: 'ID', valueGetter: 'node.id', width: 55 },
    {
        headerName: ct('MSG_KEY'),
        field: 'msgKey',
        editable: true,
        valueGetter: (param: any) => onUpdate(param, 'msgKey'),
    },
    {
        headerName: ct('KO_TEXT'),
        field: 'ko_text',
        editable: true,
        valueGetter: (param: any) => onUpdate(param, 'ko_text'),
    },
    {
        headerName: ct('JP_TEXT'),
        field: 'jp_text',
        editable: true,
        valueGetter: (param: any) => onUpdate(param, 'jp_text'),
    },
    {
        headerName: ct('EN_TEXT'),
        field: 'en_text',
        editable: true,
        valueGetter: (param: any) => onUpdate(param, 'en_text'),
    },
])

const state = reactive<gridData>({
    addedRows: [],
    updatedRows: [],
    deletedRows: [],
    gridData: [],
    isFailedToast: false,
    isSuccessedToast: false,
})
const gridData = computed(() => state.gridData.filter((item) => !item.deleted))

let gridApi: any

const onGridReady = (params: { api: any; columnApi: any }) => {
    gridApi = params.api
}

const handleExternalButtonClick = async () => {
    state.isFailedToast = false
    state.isSuccessedToast = true
    gridApi.stopEditing()
    findRowChanges(state.gridData)
    Promise.all([
        saveLocale([...state.addedRows, ...state.updatedRows]),
        deleteLocale([...state.deletedRows.map((val) => (val ? val.msgKey : ''))]),
    ]).then((res) => {
        const result = res.map((val) => val.data).find((val) => val === -1)
        if (result) {
            state.isFailedToast = true
            window.setTimeout(() => {
                state.isFailedToast = false
            }, 1500)
        } else {
            state.isSuccessedToast = true
            getTrtext()
            window.setTimeout(() => {
                state.isSuccessedToast = false
            }, 1500)
        }
    })
}

const findRowChanges = (rowData: Partial<rowData>[]) => {
    state.addedRows = rowData.filter((row) => row.new)
    state.updatedRows = rowData.filter((row) => row.updated)
    state.deletedRows = rowData.filter((row) => row.deleted)
    state.addedRows = state.addedRows.map((row) => ({ ...row, new: undefined, updated: undefined, deleted: undefined, added: undefined }))
    state.updatedRows = state.updatedRows.map((row) => ({ ...row, new: undefined, updated: undefined, deleted: undefined, added: undefined }))
    state.deletedRows = state.deletedRows.map((row) => ({ ...row, new: undefined, updated: undefined, deleted: undefined, added: undefined }))
}

const getTrtext = async () => {
    const { data } = await requestFullLocaleList()
    const trtexts = data as locale[]
    trtexts.forEach((val) => (val.added = true))
    state.gridData = trtexts
}
</script>
