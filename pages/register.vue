<template>
	<div class="min-h-screen flex items-center">
		<div class="grid grid-cols-12 w-full">
			<!-- Title -->
			<div class="col-span-full text-center text-2xl font-bold">Register</div>

			<!-- Register Card -->
			<form @submit.prevent="userRegister" class="col-span-full justify-self-center w-[20rem] mt-5 border border-gray-700 p-5 rounded-lg">
				<!-- Username -->
				<div v-if="registerError.path === 'username'" class="mb-2">
					<p class="text-red-500 text-xs font-thin ml-[0.2rem]">{{ registerError.message }}</p>
				</div>

				<label class="input input-bordered flex items-center gap-2 mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/>
					</svg>
					<input type="text" v-model.trim="userData.username" maxlength="20" class="grow text-xs" placeholder="Username" autocomplete="off" required />
				</label>

				<!-- Password -->
				<div v-if="registerError.path === 'password'" class="mb-2">
					<p class="text-red-500 text-xs font-thin ml-[0.2rem]">{{ registerError.message }}</p>
				</div>

				<label class="input input-bordered flex items-center gap-2 mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
						<path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input type="password" v-model.trim="userData.password" placeholder="Password" class="grow text-xs" required />
				</label>

				<!-- Confirm Password -->
				<div v-if="registerError.path === 'confirmPassword'" class="mb-2">
					<p class="text-red-500 text-xs font-thin ml-[0.2rem]">{{ registerError.message }}</p>
				</div>

				<label class="input input-bordered flex items-center gap-2 mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
						<path
							fill-rule="evenodd"
							d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input type="password" v-model.trim="userData.confirmPassword" placeholder="Confirm Password" class="grow text-xs" required />
				</label>

				<!-- Submit Button -->
				<div class="flex justify-center mt-2 mb-3">
					<button type="submit" class="btn btn-primary text-white w-full" :disabled="!canSubmit">Register</button>
				</div>

				<!-- Login & Homepage Link -->
				<div>
					<div class="text-xs">Already have an account? <NuxtLink to="/login" class="text-blue-500 hover:underline">Login</NuxtLink></div>
					<div class="text-xs">Back to <NuxtLink to="/" class="text-blue-500 hover:underline">Homepage</NuxtLink></div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import afterAuth from "~/middleware/afterAuth";

definePageMeta({
	middleware: afterAuth,
});

useHead({
	title: "Register",
});

const config = useRuntimeConfig();
const userData = ref({
	username: "",
	password: "",
	confirmPassword: "",
});

const registerError = ref({
	name: "",
	path: "",
	message: "",
});

const userRegister = async () => {
	if (!canSubmit) return;
	try {
		const response = await $fetch(`${config.public.apiUrl}/auth/register`, {
			method: "POST",
			body: userData.value,
		});

		registerError.value = { name: "", path: "", message: "" }; // Reset error on success
		return navigateTo("/login");
	} catch (err: any) {
		registerError.value = err.response._data.error;
	} finally {
		await refreshNuxtData();
	}
};

const canSubmit = computed(() => {
	return userData.value.username.trim() && userData.value.password.trim() && userData.value.confirmPassword.trim();
});
</script>

<style scoped>
/*  */
</style>
