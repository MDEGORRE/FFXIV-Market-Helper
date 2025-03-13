<template>
    <h1 class="bg-white max-w-fit mx-auto mt-2 rounded p-2 text-center text-lg font-bold">Raid gears market overview</h1>
        <form @change="handleWorldChange" class="mx-auto max-w-screen-md my-3">
            <fwb-select
            v-model="selectedWorld"
            :options="worlds"
            label="Select a world"
            />
        </form>
        <form class="mx-auto max-w-screen-md my-3">
            <fwb-select
            v-model="selectedType"
            :options="gearTypes"
            label="Select a type"
            />
        </form>
    <fwb-table class="max-w-screen-md mx-auto my-3" v-if="selectedWorld !== ''">
		<fwb-table-head>
			<fwb-table-head-cell>Gear</fwb-table-head-cell>
			<fwb-table-head-cell class="text-center">Price (gils)</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Updated</fwb-table-head-cell>
		</fwb-table-head>
		<fwb-table-body>
			<fwb-table-row v-for="gear in filteredGears" :key="gear.itemId">
				<fwb-table-cell>
                <a target="_blank" :href="gear.lodestoneLink" class="eorzeadb_link font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {{ gearsData[gear.itemId][selectedLanguage] }}
                </a> <img class="inline" src="https://universalis.app/i/game/hq.png"></fwb-table-cell>
				<fwb-table-cell class="price">{{ gear.hq.minListing.world.price }}</fwb-table-cell>
                <fwb-table-cell class="interval">{{ humanizeDuration(currentTime - gear.lastUploadTime, {language: selectedLanguage, units: ["mo", "w", "d", "h", "m"], round: true, delimiter: " "}) }} ago</fwb-table-cell>
			</fwb-table-row>
            <fwb-table-row v-if="selectedType !== ''">
                <fwb-table-cell colspan="3">Total amount: {{ Object.values(filteredGears).reduce((a,b) => a + b.hq.minListing.world.price, 0) }}</fwb-table-cell>
            </fwb-table-row>
    	</fwb-table-body>
    </fwb-table>
</template>


<style>
label > span{
    color: white !important;
}
.price, .interval {
	text-align: center !important;
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

import { ref, onMounted } from 'vue'
import worlds from './worlds.js'
import gearsData from './gears.js'
import humanizeDuration from 'humanize-duration'
  
const selectedWorld = ref(null)
const selectedType = ref("")
const selectedLanguage = ref("en")
const gears = ref(null)
const currentTime = Date.now()

const gearsIds = Object.keys(gearsData).map(key => parseInt(key))

const gearTypes = [
    {value: "", name: "All"},
    {value: "fending", name: "Fending"}, 
    {value: "aiming", name: "Aiming"},
    {value: "casting", name: "Casting"},
    {value: "healing", name: "Healing"},
    {value: "slaying", name: "Slaying"},
    {value: "scouting", name: "Scouting"}
]

const filteredGears = computed(() => {
    return selectedType.value !== "" ? gears.value.filter(gear => gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === selectedType.value)) : gears.value
})

async function handleWorldChange() {
    await onWorldChange(selectedWorld.value, selectedLanguage.value, gears, gearsIds, true)
}

useHead({
    title: "FFXIV Market Helper - Gears",
    script: [{ src: "https://lds-img.finalfantasyxiv.com/pc/global/js/eorzeadb/loader.js?v3", body: true}],
});

onMounted(()=> {
    selectedLanguage.value = localStorage.getItem('preferredLanguage') !== null ? localStorage.getItem('preferredLanguage') : "en"
    selectedWorld.value = Number.isInteger(parseInt(localStorage.getItem('preferredWorld'))) ? parseInt(localStorage.getItem('preferredWorld')) : ""; 
    selectedWorld.value !== "" ? handleWorldChange() : "";
})
</script>