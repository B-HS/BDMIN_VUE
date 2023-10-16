<template>
    <section class="h-full flex flex-col">
        <Card class="flex gap-2 justify-end">
            <button class="btn btn-primary btn-xs" @click="getTrtext">SEARCH</button>
            <button class="btn btn-primary btn-xs" @click="addRow">ADD</button>
            <button class="btn btn-primary btn-xs">DELETE</button>
            <button class="btn btn-primary btn-xs" @click="handleExternalButtonClick">SAVE</button>
        </Card>
        <AGGrid
            class="ag-theme-alpine h-full"
            ref="grid"
            rowSelection="multiple"
            animateRows="true"
            @grid-ready="onGridReady"
            :columnDefs="columnDefs"
            :rowData="gridData"
        />
    </section>
</template>
<script setup lang="ts">
import { AgGridVue as AGGrid } from 'ag-grid-vue3'
import { computed, reactive, ref } from 'vue'
import { requestFullLocaleList } from '../../api/locale'
import Card from '../../components/card.vue'
import { locale } from '../../types/app'

interface column {
    field: keyof locale
    width: number
    headerName: string
    valueGetter: string | Function
    editable: boolean
}

interface rowData {
    id: number
    msg_key: string
    lang_type: string
    trtext: string
    new: boolean | string
    updated: boolean | string
    deleted: boolean | string
}

interface gridData {
    addedRows: rowData[]
    updatedRows: rowData[]
    deletedRows: rowData[]
    gridData: Partial<rowData>[]
}
const grid = ref()

const addRow = () => {
    state.gridData = [...state.gridData, { new: false }]
}

const onUpdate = (param: any) => {
    if (!param.data.new) {
        param.data.updated = true
    }
    return param.data.msg_key
}
const columnDefs = ref<Partial<column>[]>([
    { headerName: 'ID', valueGetter: 'node.id', width: 55 },
    {
        headerName: 'MSG_KEY',
        field: 'msg_key',
        editable: true,
        valueGetter: onUpdate,
    },
    {
        headerName: 'LANG_TYPE',
        field: 'lang_type',
        editable: true,
        valueGetter: onUpdate,
    },
    {
        headerName: 'TRTEXT',
        field: 'trtext',
        editable: true,
        valueGetter: onUpdate,
    },
])

const state = reactive<gridData>({
    addedRows: [],
    updatedRows: [],
    deletedRows: [],
    gridData: [],
})
const gridData = computed(() => state.gridData.filter((item) => !item.deleted))

let gridApi: any

const onGridReady = (params: { api: any; columnApi: any }) => {
    gridApi = params.api
}

const handleExternalButtonClick = () => {
    gridApi.stopEditing()
    const rowData = gridApi.getModel().rowsToDisplay
    findRowChanges(rowData)
}

const findRowChanges = (rowData: rowData[]) => {
    state.addedRows = rowData.filter((row) => row.new)
    state.updatedRows = rowData.filter((row) => row.updated)
    state.deletedRows = rowData.filter((row) => row.deleted)
}

const getTrtext = async () => {
    const { data } = await requestFullLocaleList()
    const trtexts = data as locale[]
    console.log(trtexts)
}
</script>
