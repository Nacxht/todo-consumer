export default defineNuxtRouteMiddleware((to, from) => {
	const jwtCookie = useCookie("jwt");

	if (!jwtCookie.value) {
		console.log("tes");
		if (to.path !== "/login") return navigateTo("/login");
	}
});
