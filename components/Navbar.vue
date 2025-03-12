<template>
    <fwb-navbar>
        <template #logo>
            <fwb-navbar-logo alt="Flowbite logo" image-url="ffxiv-market-helper-logo.webp" link="#">
                FFXIV Market Helper
            </fwb-navbar-logo>
        </template>
        <template #default="{isShowMenu}">
            <fwb-navbar-collapse :is-show-menu="isShowMenu">
                <fwb-navbar-link :is-active = "route.name === 'maps' ? true: false" link="/maps">
                    Maps
                </fwb-navbar-link>
                <fwb-navbar-link :is-active = "route.name === 'materias' ? true: false" link="/materias">
                    Materias
                </fwb-navbar-link>
                <fwb-navbar-link :is-active = "route.name === 'foods' ? true: false" link="/foods">
                    Foods
                </fwb-navbar-link>
                <fwb-navbar-link :is-active = "route.name === 'gears' ? true: false" link="/gears">
                    Gears
                </fwb-navbar-link>
                <fwb-navbar-link :is-active = "route.name === 'potions' ? true: false" link="/potions">
                    Potions
                </fwb-navbar-link>
                <ParamModal />
            </fwb-navbar-collapse>
        </template>
    </fwb-navbar>
</template>
  
<script setup lang="ts">
import {
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo
} from 'flowbite-vue'

import {ref} from 'vue';

const route = useRoute()

const selectedLanguage = ref("en")
const languages = [{value:"en", name:"EN"}, {value:"fr", name:"FR"}, {value:"de", name:"DE"}, {value:"ja", name: "JA"}]
</script>