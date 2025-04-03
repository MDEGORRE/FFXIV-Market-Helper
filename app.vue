<template>
    <Navbar />
    <main>
        <NuxtPage />
    </main>
    <ClientOnly>
    	<Footerbar />
    </ClientOnly>
</template>

<style>
form:not(.paramForm) span {
    color: white;
}
</style>

<script setup>
useHead({
    meta: [
    { name: 'description', content: 'Website about items datas from the Final Fantasy XIV game. Helps players making profit or saving gils.' },
    { name: 'author', content: "Michaël Degorre" },
    { name: 'keywords', content: "Market, MarketBoard, Prices, Items, Final Fantasy XIV, FFXIV, Square Enix, Universalis, Treasure maps, Potions, Raids, Gils, Gears, Materias, Foods" }
    
    ],
    bodyAttrs: {
    	class: "bg-[url('https://lds-img.finalfantasyxiv.com/h/I/RnhxiLA0fuKtHd4bywd8OzzHcM.jpg')] lg:bg-[url('https://lds-img.finalfantasyxiv.com/h/F/QAim605TH1YRvUi9cFGReikYoI.jpg')] bg-cover bg-center"
    }
})
</script>
