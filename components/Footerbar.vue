<template>
    <fwb-footer class="opacity-85 fixed bottom-0 w-full rounded-none">
      <fwb-footer-copyright
        by="FFXIV Market Helper."
        href="/about"
        copyright-message=""
        class="text-center"
      />
	  <p class="text-center">FINAL FANTASY XIV © 2010 - 2025 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
    <p class="text-center">FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.</p>
      <fwb-footer-link-group>
        <fwb-footer-link href="https://docs.universalis.app/">
        	Universalis API
        </fwb-footer-link>
		<fwb-footer-link :href=lodestoneLink>
			The Lodestone
		</fwb-footer-link>
      </fwb-footer-link-group>
    </fwb-footer>
</template>

<script setup lang="ts">
import {
  FwbFooter,
  FwbFooterCopyright,
  FwbFooterLink,
  FwbFooterLinkGroup,
} from 'flowbite-vue'

const selectedLanguage = ref(getLocalStorage())

let languageLink;
    switch (selectedLanguage.value) {
        case 'en': languageLink = 'eu';
        break;
        case 'ja': languageLink = 'jp';
        break;
        default: languageLink = selectedLanguage.value
    }
let lodestoneLink = "https://" + languageLink + ".finalfantasyxiv.com/lodestone/"

function getLocalStorage () {
	return localStorage.getItem('preferredLanguage') !== null ? localStorage.getItem('preferredLanguage') : "en"
}

</script>