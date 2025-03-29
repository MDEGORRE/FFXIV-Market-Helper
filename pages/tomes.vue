<template>
    <h1 class="bg-white max-w-fit mx-auto mt-2 rounded p-2 text-center text-lg font-bold">Treasure maps market overview</h1>
        <form @change="handleWorldChange" class="mx-auto max-w-screen-md my-3">
            <fwb-select
            v-model="selectedWorld"
            :options="worlds"
            label="Select a world"
            />
        </form>
    <fwb-table class="max-w-screen-md mx-auto my-3" v-if="selectedWorld !== ''">
		<fwb-table-head>
			<fwb-table-head-cell>Treasure map</fwb-table-head-cell>
			<fwb-table-head-cell class="text-center">Price (gils)</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Updated</fwb-table-head-cell>
		</fwb-table-head>
		<fwb-table-body>
			<fwb-table-row v-for="tomesItem in tomesItems" :key="tomesItem.itemId">
				<fwb-table-cell>
                <a target="_blank" :href="tomesItem.lodestoneLink" class="eorzeadb_link font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {{ tomesItemsData[tomesItem.itemId][selectedLanguage] }} 
                </a></fwb-table-cell>
				<fwb-table-cell class="price">{{ tomesItem.nq.minListing.world.price }}</fwb-table-cell>
                <fwb-table-cell class="interval">{{ humanizeDuration(currentTime - tomesItem.lastUploadTime, {language: selectedLanguage, units: ["mo", "w", "d", "h", "m"], round: true, delimiter: " "}) }} ago</fwb-table-cell>
			</fwb-table-row>
    	</fwb-table-body>
    </fwb-table>
</template>

<style>
label > span {
    color: white !important;
}
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

import worlds from './worlds.js'
import tomesItemsData from './tomes_items.js'
import humanizeDuration from 'humanize-duration'
import { useMediaQuery } from '@vueuse/core'
  
const selectedWorld = ref(null)
const selectedLanguage = ref("en")
const tomesItems = ref(null)
const currentTime = Date.now()

const tomesItemsIds = Object.keys(tomesItemsData).map(key => parseInt(key))

async function handleWorldChange() {
    await onWorldChange(selectedWorld.value, selectedLanguage.value, tomesItems, tomesItemsIds)
}

const isDesktop = useMediaQuery('(min-width: 768px)')

useHead(() => ({
    title: "FFXIV Market Helper - Treasure maps",
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