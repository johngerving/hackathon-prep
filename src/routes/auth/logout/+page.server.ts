import type { Actions } from './$types.js';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals: { session, supabase } }) => {
		console.log('logout');
		if (!session) redirect(303, '/');

		console.log(session.access_token);
		const { error } = await supabase.auth.admin.signOut(session.access_token);
		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/');
		}
	}
};
