<script>
	import '../app.postcss';
	import { page } from '$app/stores';

	$: routeId = $page.route.id;
	export const prerender = true;
</script>

<h1>Bitshop</h1>
<a class="link link-primary" class:active={routeId == '/'} href="/">Home</a>
<a class="link link-primary" class:active={routeId == '/about'} href="/about">About</a>
<a class="link link-primary" class:active={routeId == '/admin'} href="/admin">Admin</a>
<a class="link link-primary" class:active={routeId == '/cart'} href="/cart">Cart</a>
<div class="divider" />
<slot />
