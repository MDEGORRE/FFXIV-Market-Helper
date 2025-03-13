<template>
	<h1 class="bg-white max-w-fit mx-auto mt-2 rounded p-2 text-center text-lg font-bold">Raid potions market overview</h1>
        <form @change="handleWorldChange" class="mx-auto max-w-screen-md">
            <fwb-select
            v-model="selectedWorld"
            :options="worlds"
            label="Select a world"
            />
        </form>
    <fwb-table class="max-w-screen-md mx-auto my-3" v-if="selectedWorld !== ''">
        <fwb-table-head>
            <fwb-table-head-cell>Potion</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Price</fwb-table-head-cell>
            <fwb-table-head-cell class="text-center">Updated</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
        <fwb-table-row v-for="raidPotion in raidPotions" :key="raidPotion.itemId">
            <fwb-table-cell>
                <a target="_blank" :href="raidPotion.lodestoneLink" class="eorzeadb_link font-medium text-blue-600 dark:text-blue-500 hover:underline">
                {{ raidPotionsData[raidPotion.itemId][selectedLanguage] }} <img class="inline" src="https://universalis.app/i/game/hq.png">
                </a>
            </fwb-table-cell>
            <fwb-table-cell class="price flex justify-center gap-2">{{ raidPotion.hq.minListing.world.price }}</fwb-table-cell>
            <fwb-table-cell class="interval">{{ humanizeDuration(currentTime - raidPotion.lastUploadTime, {language: selectedLanguage,units: ["mo", "w", "d", "h", "m"], round: true, delimiter: " "}) }} ago</fwb-table-cell>
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

import { ref, onMounted } from 'vue' 
import worlds from './worlds.js'
import humanizeDuration from 'humanize-duration'
import raidPotionsData from '~/raid_potions.js'
import { useMediaQuery } from '@vueuse/core'

const selectedWorld = ref(null)
const selectedLanguage = ref("en")
const raidPotions = ref(null)
const raidPotionsIds = Object.keys(raidPotionsData).map(key => parseInt(key))
const currentTime = Date.now()

async function handleWorldChange() {
    await onWorldChange(selectedWorld.value, selectedLanguage.value, raidPotions, raidPotionsIds, true)
}

const isDesktop = useMediaQuery('(min-width: 768px)')

useHead(() => ({
    title: "FFXIV Market Helper - Potions",
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