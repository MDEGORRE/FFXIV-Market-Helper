<template>
    <Navbar />
    <main>
        <NuxtPage />
    </main>
    <ClientOnly>
    	<Footerbar />
    </ClientOnly>
</template>

<script setup>
useHead({
    bodyAttrs: {
      class: "bg-[url('https://lds-img.finalfantasyxiv.com/h/Y/d7DqmLQ5zAcOKaUpO9tV6yEh8I.jpg')] bg-cover bg-center"
    }
  })
</script>
