import type { PageServerLoad } from './$types';
import type { Note } from '$lib/types/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:notes');
	const { data: notes } = (await supabase.from('notes').select('id,note').order('id')) as {
		data: Note[];
	};
	return { notes: notes ?? [] };
};

export const actions = {
	create: async (event) => {
		const data = await event.request.formData();

		const note = (data.get('note') ?? '') as string;

		if (!note) return fail(400, {});

		const { error } = await event.locals.supabase.from('notes').insert({ note });
		if (error) {
			console.error(error);
			return fail(500, {});
		}
	},
	delete: async (event) => {
		const data = await event.request.formData();

		const noteId = (data.get('id') ?? '') as string;

		if (!noteId) return fail(400, {});

		const { error } = await event.locals.supabase.from('notes').delete().eq('id', noteId);
		if (error) {
			console.error(error);
			return fail(500, {});
		}
	}
};
