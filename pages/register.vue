<template>
	<div>
		<h1>This is Register Page yo!</h1>

		<form @submit.prevent="userRegister">
			<!-- Username -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="username">Username</label></p>
				<input type="text" id="username" v-model="registerForm.username" />
			</div>

			<!-- Email -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="email">Email</label></p>
				<input type="email" id="email" v-model="registerForm.email" />
			</div>

			<!-- First Name -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="firstName">First Name</label></p>
				<input type="text" id="firstName" v-model="registerForm.firstName" />
			</div>

			<!-- Last Name -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="lastName">Username</label></p>
				<input type="text" id="lastName" v-model="registerForm.lastName" />
			</div>

			<!-- Password -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="password">Password</label></p>
				<input type="password" id="password" v-model="registerForm.password" />
			</div>

			<!-- Confirm Password -->
			<div class="input">
				<p style="margin-bottom: 0.5rem"><label for="confirmPassword">Confirm Password</label></p>
				<input type="password" id="confirmPassword" v-model="registerForm.confirmPassword" />
			</div>

			<!-- Submit Button -->
			<div style="margin-top: 1rem">
				<button type="submit">Register!</button>
			</div>
		</form>
	</div>
</template>

<script setup>
const config = useRuntimeConfig();
const registerForm = ref({
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	password: "",
	confirmPassword: "",
});

async function userRegister() {
	$fetch(`${config.public.apiUrl}/auth/register`, {
		method: "POST",
		body: registerForm.value,
	});
}
</script>

<style scoped></style>
