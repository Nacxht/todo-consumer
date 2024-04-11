<template>
	<div>
		<slot />
	</div>
</template>

<script setup lang="ts">
const route = useRoute();

useHead({
	titleTemplate: (title) => {
		return title ? `Todo | ${title}` : `Todo`;
	},
});
</script>

<style scoped>
/*  */
</style>
