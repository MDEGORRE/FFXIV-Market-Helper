<template>
	<h1 class="bg-white max-w-fit mx-auto mt-2 p-2 rounded text-center text-lg font-bold">Materias market overview</h1>
        <form @change="handleWorldChange" class="mx-auto max-w-screen-md">
            <fwb-select
            v-model="selectedWorld"
            :options="worlds"
            label="Select a world"
            />
        </form>
        <form class="mx-auto max-w-screen-md my-3">
            <fwb-select
            v-model="selectedType"
            :options="materiasTypes"
            label="Select a type"
            />
        </form>
    <fwb-table class="max-w-screen-lg mx-auto my-3" v-if="selectedWorld !== ''">
        <fwb-table-head>
            <fwb-table-head-cell>Materia</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Price</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Updated</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
        <fwb-table-row v-for="materia in filteredMaterias" :key="materia.itemId">
            <fwb-table-cell>
                <a target="_blank" :href="materia.lodestoneLink" class="eorzeadb_link font-medium text-blue-600 dark:text-blue-500 hover:underline">
                {{ materiasData[materia.itemId][selectedLanguage] }}
                </a>
            </fwb-table-cell>
            <fwb-table-cell class="price flex justify-center gap-2">{{ materia.nq.minListing.world.price }}</fwb-table-cell>
            <fwb-table-cell class="interval">{{ humanizeDuration(currentTime - materia.lastUploadTime, {language: selectedLanguage, units: ["mo", "w", "d", "h", "m"], round: true, delimiter: " "}) }} ago</fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
</template>
  
<style>
.price, .interval {
	text-align: center !important;
}
#eorzeadb_tooltip {
    overflow: visible !important;
}
</style>

<script setup>
import {
    FwbTable,
    FwbTableBody,
    FwbTableCell,
    FwbTableHead,
    FwbTableHeadCell,
    FwbTableRow,
	FwbSelect
} from 'flowbite-vue'

import { ref, computed, onMounted } from 'vue' 
import worlds from './worlds.js'
import materiasData from './materias.js'
import humanizeDuration from 'humanize-duration'
import { useMediaQuery } from '@vueuse/core'

const materiasIds = Object.keys(materiasData).map(key => parseInt(key))

const selectedWorld = ref(null)
const selectedLanguage = ref("en")
const selectedType = ref('')
const materias = ref([])
const materiasTypes = [{value: 'combat', name: "Combat"}, {value: 'gathering', name: 'Gathering'}, {value: 'crafting', name: "Crafting"}, {value:'', name: 'All'}]
const currentTime = Date.now()

const filteredMaterias = computed(() => {
        switch(selectedType.value) {
        case 'gathering': return materias.value.filter(materia => materiasData[materia.itemId].en.includes("Gatherer"))
        case 'crafting': return materias.value.filter(materia => materiasData[materia.itemId].en.includes("Craft"))
        case 'combat': return materias.value.filter(materia => !materiasData[materia.itemId].en.includes("Gatherer") && !materiasData[materia.itemId].en.includes("Craft"))
        default: return materias.value
        }
})

async function handleWorldChange() {
    await onWorldChange(selectedWorld.value, selectedLanguage.value, materias, materiasIds)
}

const isDesktop = useMediaQuery('(min-width: 768px)')

useHead(() => ({
    title: "FFXIV Market Helper - Materias",
    script: isDesktop.value
    ? [{ src: 'https://lds-img.finalfantasyxiv.com/pc/global/js/eorzeadb/loader.js?v3', async: true, defer: true }]
    : []
}))

onMounted(()=> {
    selectedLanguage.value = localStorage.getItem('preferredLanguage') !== null ? localStorage.getItem('preferredLanguage') : "en"
    selectedWorld.value = Number.isInteger(parseInt(localStorage.getItem('preferredWorld'))) ? parseInt(localStorage.getItem('preferredWorld')) : ""; 
    selectedWorld.value !== "" ? handleWorldChange() : "";
})


</script>