export default defineNuxtRouteMiddleware((to, from) => {
	const jwtCookie = useCookie("jwt");

	if (jwtCookie.value) {
		if (to.path !== "/todo") return navigateTo("/todo");
	}
});
