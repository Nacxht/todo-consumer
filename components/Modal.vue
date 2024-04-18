<template>
	<dialog id="main_modal" class="modal">
		<div class="modal-box shadow-none">
			<FormTodoUpdate v-show="content === 'formTodoUpdate'" />
		</div>

		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const jwtCookie = useCookie("jwt");

let { content } = defineProps(["content"]);
</script>

<style scoped>
/*  */
</style>
