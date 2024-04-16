<template>
	<div class="flex min-h-screen lg:h-screen lg:max-h-screen justify-center mb-1 lg:mb-0">
		<div class="grid grid-cols-12 h-full w-[50rem] p-5 gap-5">
			<!-- Todo Form & Handler -->
			<div class="col-span-full lg:col-span-5 border border-gray-600 order-1 lg:order-2 h-fit rounded-lg p-4">
				<form @submit.prevent="addTodo" @submit="submitDelayers" class="space-y-3">
					<div class="text-center font-semibold text-sm">- Create a New Todo -</div>
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

					<!-- Description -->
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

					<!-- Submit Button & Logout Button -->
					<button type="submit" :disabled="!canSubmit || isSubmitDelay || todoListPending" class="btn btn-outline btn-primary w-full text-xs">
						<span v-if="todoListPending" class="invert"><img src="/svg/loading.svg" alt="" /></span>
						<span v-else>Create a new todo</span>
					</button>
					<button type="button" @click.prevent="logout" class="btn btn-outline btn-error w-full text-xs">Logout</button>
				</form>

				<div class="divider mb-2"></div>

				<div class="w-full space-y-3">
					<div class="text-center font-semibold text-sm">- Task Categories -</div>
					<div class="grid grid-cols-2 gap-3">
						<button
							@click="todoCategorySet(false)"
							class="btn w-full"
							:class="{ 'btn-neutral': !todoCategory, 'outline outline-1 outline-green-500': !todoCategory }"
							:disabled="!todoCategory"
						>
							Incomplete
						</button>
						<button
							@click="todoCategorySet(true)"
							class="btn w-full"
							:class="{ 'btn-neutral': todoCategory, 'outline outline-1 outline-green-500': todoCategory }"
							:disabled="todoCategory"
						>
							Complete
						</button>
					</div>
				</div>
			</div>

			<!-- Todo Lists -->
			<div
				class="col-span-full lg:col-span-7 border border-gray-600 order-3 lg:order-1 rounded-lg overflow-y-auto min-h-[25rem] lg:min-h-full max-h-[25rem] lg:max-h-full p-5 space-y-3"
			>
				<!-- Loading -->
				<div v-if="todoListPending" class="flex-row">
					<div class="card w-full h-fit bg-neutral text-neutral-content">
						<div class="h-full flex p-3">
							<div class="w-full text-center">
								<h2 class="text-base capitalize text-300">Loading...</h2>
								<p class="text-xs text-gray-400 mt-1 font-light">Wait for a moment!</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Empty -->
				<div v-else-if="!todoList?.data.length" class="flex-row">
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
					<TodoCard :todoData="todo" :currentCategory="todoCategory" />
				</div>
			</div>
		</div>

		<!-- Modal (Coming soon, I'm still lazy to using modal) -->
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
const isSubmitDelay = ref(false);
const todoCategory = ref(false); // True => Completed | False => Incomplete

// "addTodo" data model
const addTodoData = ref({
	title: "",
	description: "",
});

// Logout
const logout = async () => {
	jwtCookie.value = null;
	return navigateTo("/login");
};

const todoCategorySet = async (isComplete: boolean) => {
	todoCategory.value = isComplete;
	await refreshNuxtData();
};

// "CreateTodo" error model
const addTodoError = ref({
	name: "",
	path: "",
	message: "",
});

// Get todo data
const { data: todoList, pending: todoListPending } = await useFetch<TodoList>(`${config.public.apiUrl}/todo/`, {
	headers: {
		Authorization: `Bearer ${jwtCookie.value}`,
	},
	params: {
		isComplete: todoCategory,
	},
	onResponseError: async ({ response }) => {
		if (response._data.error) {
			const errName = response._data.error.name;
			switch (errName) {
				case "TokenExpiredError":
					await logout();
			}
		}
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

		switch (addTodoError.value.name) {
			case "TokenExpiredError":
				return await logout();
		}
	} finally {
		await refreshNuxtData();
	}
};

// Delaying submit button
const submitDelayers = async () => {
	isSubmitDelay.value = true;
	setTimeout(() => {
		isSubmitDelay.value = false;
	}, 700);
};

// Input Validate
const canSubmit = computed(() => {
	return addTodoData.value.title.trim() && addTodoData.value.description.trim();
});
</script>

<style scoped>
/*  */
</style>
