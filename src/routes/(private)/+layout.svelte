<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Spinner } from '$lib/components/ui/spinner';

	let { data, children } = $props();
	let { supabase } = $derived(data);

	let updating = $state(false);
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<form
		method="POST"
		action="/auth/logout"
		use:enhance={() => {
			updating = true;

			return async ({ update }) => {
				await update();
				updating = false;
			};
		}}
	>
		<Button type="submit" disabled={updating}>
			{#if updating}
				<Spinner />
			{:else}
				Logout
			{/if}
		</Button>
	</form>
</header>
<main>
	{@render children()}
</main>
