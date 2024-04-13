export default defineNuxtRouteMiddleware((to, from) => {
	const jwtCookie = useCookie("jwt");

	if (!jwtCookie.value) {
		if (to.path !== "/login") return navigateTo("/login");
	}
});
