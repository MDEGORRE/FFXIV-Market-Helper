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
    <fwb-table class="max-w-screen-lg mx-auto my-3" v-if="selectedWorld !== ''">
		<fwb-table-head>
			<fwb-table-head-cell>Gear</fwb-table-head-cell>
			<fwb-table-head-cell class="text-center">Local Price (gils)</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Lowest regional Price (gils)</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Updated</fwb-table-head-cell>
		</fwb-table-head>
		<fwb-table-body>
			<fwb-table-row v-for="gear in filteredGears" :key="gear.itemId">
				<fwb-table-cell>
                <a target="_blank" :href="gear.lodestoneLink" class="eorzeadb_link font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {{ gearsData[gear.itemId][selectedLanguage] }}
                </a> <img class="inline" src="https://universalis.app/i/game/hq.png" alt="High quality item"></fwb-table-cell>
				<fwb-table-cell class="price">{{ gear.hq.minListing.world.price }}</fwb-table-cell>
                <fwb-table-cell class="price">
                    {{ gear.hq.minListing.region.price }} 
                    ({{ worlds.find(world => world.value === gear.hq.minListing.region.worldId).name }})
                </fwb-table-cell>
                <fwb-table-cell class="interval">{{ humanizeDuration(currentTime - gear.lastUploadTime, {language: selectedLanguage, units: ["mo", "w", "d", "h", "m"], round: true, delimiter: " "}) }} ago</fwb-table-cell>
			</fwb-table-row>
            <fwb-table-row v-if="selectedType !== ''">
                <fwb-table-cell colspan="4">Total amount (World): {{ worldPrice }}</fwb-table-cell>
            </fwb-table-row>
            <fwb-table-row v-if="selectedType !== ''">
                <fwb-table-cell colspan="4">Total amount (Region): {{ regionalPrice }}
                    <span class="text-emerald-500"> - {{ ((worldPrice - regionalPrice) / worldPrice * 100).toFixed(2) }} %</span>
                </fwb-table-cell>
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

import { ref, onMounted } from 'vue'
import worlds from './worlds.js'
import gearsData from './gears.js'
import humanizeDuration from 'humanize-duration'
import { useMediaQuery } from '@vueuse/core'
  
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
    {value: "scouting", name: "Scouting"},
    {value: "maiming", name: "Maiming"},
    {value: "striking", name: "Striking"}
]

const filteredGears = computed(() => {
    switch(selectedType.value) {
        case "": return gears.value; break;
        // Dragoon / Reaper / Monk / Samurai stuff: shares right side accessories
        case "maiming": 
        case "striking":
        return gears.value.filter(gear => gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === selectedType.value) || gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === "slaying")); break;
        // Ninja / Viper stuff: shares right side accessories with aiming stuff
        case "scouting": 
        const gearsPieces = ['Vest', 'Armguards', 'Culottes', 'Crakows', 'Longcap'];
        return gears.value.filter(gear => gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === selectedType.value) || ( gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === "aiming") && 
        !gearsPieces.some((gearPiece) => gearsData[gear.itemId]["en"].includes(gearPiece)))); break;
        default: return gears.value.filter(gear => gearsData[gear.itemId]["en"].toLowerCase().split(" ").some((string) => string === selectedType.value))
    }
})

const worldPrice = computed(() => {
    if (selectedType.value !== '') {
        return Object.values(filteredGears.value).reduce((a,b) => a + b.hq.minListing.world.price, 0);
    }
});

const regionalPrice = computed(() => {
    if (selectedType.value !== '') {
        return Object.values(filteredGears.value).reduce((a,b) => a + b.hq.minListing.region.price, 0);
    }
})

async function handleWorldChange() {
    await onWorldChange(selectedWorld.value, selectedLanguage.value, gears, gearsIds, true)
}

const isDesktop = useMediaQuery('(min-width: 768px)')

useHead(() => ({
    title: "FFXIV Market Helper - Gears",
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