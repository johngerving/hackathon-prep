import type { PageServerLoad } from './$types';
import type { Note } from '$lib/types/database';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:notes');
	const { data: notes } = (await supabase.from('notes').select('id,note').order('id')) as {
		data: Note[];
	};
	return { notes: notes ?? [] };
};
