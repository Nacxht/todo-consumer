<template>
	<div class="card w-full h-fit bg-neutral text-neutral-content">
		<div class="h-full flex p-3">
			<div class="flex flex-col justify-center items-center gap-4">
				<!-- Is Complete -->
				<input
					type="checkbox"
					@change="todoUpdateData.isComplete = !todoUpdateData.isComplete"
					@change.prevent="updateTodo"
					:checked="todoUpdateData.isComplete"
					class="checkbox checkbox-sm self-center"
				/>

				<!-- Delete -->
				<button @click="deleteTodo" class="w-fit h-fit min-h-0 btn btn-ghost p-0">
					<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
						/>
					</svg>
				</button>
			</div>

			<div class="divider divider-horizontal"></div>

			<div class="w-full">
				<h2 class="text-base capitalize text-300">{{ todoData.title }}</h2>
				<p class="text-xs text-gray-400 mt-1 font-light">{{ todoData.description }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const jwtCookie = useCookie("jwt");

const { todoData } = defineProps(["todoData"]);
const todoUpdateData = ref({
	todoId: todoData.todoId,
	title: todoData.title,
	description: todoData.description,
	isComplete: todoData.isComplete,
});

const deleteTodoError = ref({
	name: "",
	path: "",
	message: "",
});

// Delete a todo
const deleteTodo = async () => {
	try {
		const response = await $fetch(`${config.public.apiUrl}/todo/delete`, {
			method: "DELETE",
			body: JSON.stringify({
				todoId: todoData._id,
			}),
			headers: {
				Authorization: `Bearer ${jwtCookie.value}`,
			},
		});
	} catch (err: any) {
		deleteTodoError.value = err.response._data.error;
	} finally {
		await refreshNuxtData();
	}
};

// Updating a todo
const updateTodo = async () => {
	// try {
	// 	const response = await $fetch(`${config.public.apiUrl}/todo/update`, {
	// 		method: "PATCH",
	// 		body: JSON.stringify(todoUpdateData.value),
	// 	});
	// } catch (err: any) {
	// 	//
	// }
};
</script>

<style scoped>
/*  */
</style>
