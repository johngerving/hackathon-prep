<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import MaterialSymbolsDeleteOutlineSharp from '~icons/material-symbols/delete-outline-sharp';

	let { data } = $props();
	let { notes, user } = $derived(data);

	$effect(() => {
		console.log(data);
	});

	$effect(() => {
		console.log(notes);
	});
</script>

<h1>Private page for user: {user?.email}</h1>
<h2>Notes</h2>
<ul>
	{#each notes as note (note.id)}
		<li class="mb-3" in:fly={{ x: -100 }} out:fly={{ x: -100 }} animate:flip={{ duration: 200 }}>
			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={note.id} />
				<span>{note.note}</span>
				<Button type="submit"><MaterialSymbolsDeleteOutlineSharp /></Button>
			</form>
		</li>
	{/each}
</ul>
<form method="POST" action="?/create" use:enhance>
	<label>
		Add a note
		<Input name="note" type="text" autocomplete="off" />
	</label>
</form>
