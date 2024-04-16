<template>
	<transition>
		<div v-show="currentCategory === todoUpdateData.isComplete" class="card w-full h-fit bg-neutral text-neutral-content">
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

				<div class="divider divider-horizontal ml-1"></div>

				<!-- Data -->
				<div class="w-full">
					<h2 class="text-base capitalize text-300 flex items-center" :class="{ 'line-through': todoUpdateData.isComplete }">
						{{ todoData.title }}
					</h2>
					<p class="text-xs text-gray-400 mt-1 font-light">{{ todoData.description }}</p>
				</div>

				<div class="divider divider-horizontal mr-1"></div>

				<!-- Edit -->
				<div class="flex items-center">
					<button onclick="main_modal.showModal()" class="w-fit h-fit min-h-0 btn btn-ghost p-0">
						<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
							/>
						</svg>
					</button>
					<Drawer />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const jwtCookie = useCookie("jwt");

const { todoData, currentCategory } = defineProps(["todoData", "currentCategory"]);
const todoUpdateData = ref({
	todoId: todoData._id,
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
	try {
		const response = await $fetch(`${config.public.apiUrl}/todo/update`, {
			method: "PATCH",
			body: JSON.stringify(todoUpdateData.value),
			headers: {
				Authorization: `Bearer ${jwtCookie.value}`,
			},
		});
	} catch (err: any) {
		//
	}
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
