<template>
    <form class="paramForm" @submit.prevent="setPreferredWorld(), setPreferredLanguage()">
        <fwb-select
            v-model="selectedWorld"
            :options="worlds"
            label="Select favorite world"
        />
        <fwb-select
            v-model="selectedLanguage"
            :options="languages"
            label="Select preferred language"
            class="mt-3"
        />
        <fwb-button class="block mx-auto my-3" color="green">Submit</fwb-button>
    </form>
</template>

<script setup>
    import { ref } from 'vue'
    import { FwbSelect, FwbButton } from 'flowbite-vue'
    import worlds from '../worlds.js'

    const selectedWorld = ref(localStorage.getItem('preferredWorld') ? parseInt(localStorage.getItem('preferredWorld')) : '')

    const selectedLanguage = ref(localStorage.getItem('preferredLanguage') ? localStorage.getItem('preferredLanguage') : 'en')
    const languages = [{value: 'en', name: "EN"}, {value: 'fr', name: 'FR'}, {value: 'de', name: "DE"}, {value:'ja', name: 'JA'}]

    function setPreferredWorld() {
		localStorage.setItem("preferredWorld", selectedWorld.value);
	}

    function setPreferredLanguage() {
		localStorage.setItem("preferredLanguage", selectedLanguage.value);
	}
</script>