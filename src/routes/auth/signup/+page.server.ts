import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;
		const supabase = event.locals.supabase;

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error();
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/');
		}
	}
};
