<template>
	<div class="flex h-screen justify-center">
		<div class="grid grid-cols-12 h-full w-[50rem] p-5 gap-5">
			<!-- Todo Form -->
			<form @submit.prevent="addTodo" class="col-span-full lg:col-span-5 border border-gray-600 order-1 lg:order-2 h-fit rounded-lg p-4 space-y-3">
				<!-- Title -->
				<div>
					<div v-if="addTodoError.path === 'title'" class="mb-2">
						<p class="text-red-500 text-xs font-thin ml-[0.2rem]">{{ addTodoError.message }}</p>
					</div>

					<input
						type="text"
						v-model.trim="addTodoData.title"
						maxlength="20"
						placeholder="Todo Title"
						autocomplete="off"
						class="input input-bordered input-md w-full focus:outline-none text-xs"
					/>
				</div>

				<!-- Descripition -->
				<div>
					<div v-if="addTodoError.path === 'description'" class="mb-2">
						<p class="text-red-500 text-xs font-thin ml-[0.2rem]">{{ addTodoError.message }}</p>
					</div>
					<textarea
						v-model.trim="addTodoData.description"
						maxlength="30"
						class="textarea textarea-bordered text-xs w-full focus:outline-none resize-none"
						placeholder="Todo description"
					></textarea>
				</div>

				<!-- Submit Button -->
				<button type="submit" :disabled="!canSubmit" class="btn btn-outline btn-primary w-full text-xs">Create a new todo</button>
			</form>

			<!-- Todo Lists -->
			<div
				class="col-span-full lg:col-span-7 border border-gray-600 order-2 lg:order-1 rounded-lg overflow-y-auto mb-1 min-h-[25rem] lg:min-h-full max-h-[25rem] lg:max-h-full p-5 space-y-3"
			>
				<!-- Empty -->
				<div v-if="!todoList?.data" class="flex-row">
					<div class="card w-full h-fit bg-neutral text-neutral-content">
						<div class="h-full flex p-3">
							<div class="w-full text-center">
								<h2 class="text-base capitalize text-300">You have no todo</h2>
								<p class="text-xs text-gray-400 mt-1 font-light">Try to create a new todo</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Not Empty -->
				<div v-else v-for="todo in todoList.data" class="flex-row">
					<TodoCard :title="todo.title" :description="todo.description ? todo.description : 'No description'" />
				</div>
			</div>
		</div>

		<!-- Modal -->
		<Modal />
	</div>
</template>

<script setup lang="ts">
import type { TodoList } from "~/composable/TypeDefinitions";
import auth from "~/middleware/auth";

definePageMeta({
	middleware: auth,
});
useHead({
	title: "List",
});

const config = useRuntimeConfig();
const jwtCookie = useCookie("jwt");

// "addTodo" data model
const addTodoData = ref({
	title: "",
	description: "",
});

// "CreateTodo" error model
const addTodoError = ref({
	name: "",
	path: "",
	message: "",
});

// Get todo data
const { data: todoList, error: todoListError } = await useFetch<TodoList>(`${config.public.apiUrl}/todo`, {
	headers: {
		Authorization: `Bearer ${jwtCookie.value}`,
	},
});

// Create/add a new todo
const addTodo = async () => {
	if (!canSubmit) return;
	try {
		const response = await $fetch(`${config.public.apiUrl}/todo/create`, {
			method: "POST",
			body: JSON.stringify(addTodoData.value),
			headers: {
				Authorization: `Bearer ${jwtCookie.value}`,
			},
		});

		addTodoError.value = { name: "", path: "", message: "" }; // Reset error on success
		addTodoData.value = { title: "", description: "" }; // Reset form on success
	} catch (err: any) {
		addTodoError.value = err.response._data.error;
	} finally {
		await refreshNuxtData();
	}
};

// Delete a todo
const deleteTodo = async () => {
	try {
		//
	} catch (err) {
		//
	}
};

const canSubmit = computed(() => {
	return addTodoData.value.title.trim() && addTodoData.value.description.trim();
});
</script>

<style scoped>
/*  */
</style>
