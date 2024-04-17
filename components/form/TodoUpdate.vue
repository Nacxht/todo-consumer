<template>
	<!-- I know man... but I can't do frontend properly :( -->
	<div v-show="!todoId" v-html="todo = todoList.data.find((todo: any) => todo._id === todoId)"></div>

	<div>
		<form @submit.prevent="" @submit="" class="space-y-3">
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
					v-model.trim="todo.title"
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
					v-model.trim="todo.description"
				></textarea>
			</div>

			<!-- Submit Button & Logout Button -->
			<button type="submit" :disabled="!canSubmit" class="btn btn-outline btn-primary w-full text-xs">
				<!-- <span v-if="" class="invert"><img src="/svg/loading.svg" alt="" /></span> -->
				<span>Update todo</span>
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { todoId } = defineProps(["todoId"]);

const { data: todoList } = useNuxtData("todoList"); // Get todo list cache
const todo = ref({ todoId: "", title: "", description: "" });

const todoUpdateData = ref({
	todoId: todo.value.todoId,
	title: todo.value.title,
	description: todo.value.description,
});

const canSubmit = computed(() => {
	return true;
});
</script>

<style scoped>
/*  */
</style>
