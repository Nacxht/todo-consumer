<template>
	<NuxtLoadingIndicator :estimated-progress="(duration, elapsed) => 45" :color="loadingIndicatorColor" />
	<div>
		<slot />
	</div>
</template>

<script setup lang="ts">
useHead({
	titleTemplate: (title) => {
		return title ? `Todo | ${title}` : `Todo`;
	},
});

const loadingIndicatorColor = "repeating-linear-gradient(90deg, rgba(24, 30, 147, 1) 0%, rgba(16, 108, 147, 1) 50%, rgba(127, 18, 150, 1) 100%)";
</script>

<style scoped>
/*  */
</style>
