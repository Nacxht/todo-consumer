<template>
	<!-- STFU. I know man... but I can't even do frontend properly - (Don't use this as a reference) -->
	<div v-if="todoId" v-show="typeof todoId === 'object'" v-html="todo = todoList.data.find((todo: any) => todo._id === todoId)"></div>
	<div
		v-if="todoId"
		v-show="typeof todoId === 'object'"
		v-html="(todoUpdateData = { todoId: todo._id, title: todo.title, description: todo.description })"
	></div>

	<div>
		<form @submit.prevent="todoUpdate(todoId)" @submit="" class="space-y-3">
			<div class="text-center font-semibold text-sm">- Update Todo -</div>

			<div class="divider"></div>

			<div>
				<div class="mb-2">
					<p class="text-red-500 text-xs font-thin ml-[0.2rem]"></p>
				</div>

				<input
					type="text"
					maxlength="20"
					placeholder="Todo Title"
					autocomplete="off"
					v-model.trim="todoUpdateData.title"
					class="input input-bordered input-md w-full focus:outline-none text-xs"
				/>
			</div>

			<!-- Description -->
			<div>
				<div class="mb-2">
					<p class="text-red-500 text-xs font-thin ml-[0.2rem]"></p>
				</div>
				<textarea
					maxlength="30"
					class="textarea textarea-bordered text-xs w-full focus:outline-none resize-none"
					placeholder="Todo description"
					v-model.trim="todoUpdateData.description"
				></textarea>
			</div>

			<!-- Submit Button & Logout Button -->
			<button type="submit" class="btn btn-outline btn-primary w-full text-xs">
				<!-- <span v-if="" class="invert"><img src="/svg/loading.svg" alt="" /></span> -->
				<span>Update todo</span>
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const jwtCookie = useCookie("jwt");
const todoId: string = inject("todoUpdateId") as string;

const { data: todoList } = useNuxtData("todoList"); // Get todo list cache
const todo = ref({ _id: "", title: "", description: "" }); // Specific todo data

const todoUpdateData = ref({
	todoId: todo.value._id,
	title: todo.value.title,
	description: todo.value.description,
});
const todoUpdateError = ref({ name: "", path: "", message: "" });
async function todoUpdate(todoId: string) {
	try {
		const response = await $fetch(`${config.public.apiUrl}/todo/update`, {
			method: "PATCH",
			body: JSON.stringify(todoUpdateData.value),
			headers: {
				Authorization: `Bearer ${jwtCookie}`,
			},
		});
	} catch (err: any) {
		//
	}
}
</script>

<style scoped>
/*  */
</style>
