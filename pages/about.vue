<template>
    <div class="bg-white my-3 max-w-screen-lg mx-auto py-3 px-5 rounded">
        <fwb-heading tag="h1" class="text-center">About</fwb-heading>
        <fwb-heading tag="h2" class="my-3">Introduction</fwb-heading>
        <p>
            FFXIV Market Helper allows Final Fantasy XIV players to quickly view market information about popular items categories.
            At the moment, you can view market overview for following categories:
        </p>
        <ul class="list-disc list-inside">
            <li>Treasure maps</li>
            <li>Materias</li>
            <li>Tomes items</li>
            <li>Raids gears</li>
            <li>Raid potions</li>
            <li>Foods</li>
        </ul>
        <p>It relies on Universalis datas.</p>
        <fwb-heading tag="h2" class="my-3">Cookies and personal data storage</fwb-heading>
        <p>We do not use cookies and do not store personal data. Your preferences (language, world settings) are stored in your browser.</p>
    </div>

</template>

<script setup>
import { FwbHeading } from 'flowbite-vue'

useHead({
    title: "FFXIV Market Helper - About",
});
</script>