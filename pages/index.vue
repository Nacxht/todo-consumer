<template>
	<div class="min-h-screen flex items-center">
		<div class="grid grid-cols-12 w-full">
			<!-- Title & Description -->
			<div class="col-span-full">
				<h1 class="text-center text-3xl font-bold">Welcome!</h1>
				<p class="text-center text-lg">To my todo app</p>
				<p class="text-center text-xs text-gray-600">( Males bikin yang bagus-bagus | Yang penting sistem bekerja )</p>
			</div>

			<!-- Divider -->
			<div class="divider col-span-full w-[20rem] justify-self-center"></div>

			<!-- Buttons -->
			<div class="col-span-full grid grid-cols-12 text-center gap-2 max-w-full lg:max-w-[16%] justify-self-center">
				<NuxtLink to="/login" class="col-span-full lg:col-span-6 btn btn-primary w-24">Log In</NuxtLink>
				<NuxtLink to="/register" class="col-span-full lg:col-span-6 btn btn-secondary w-24">Register</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
/*  */
</style>
