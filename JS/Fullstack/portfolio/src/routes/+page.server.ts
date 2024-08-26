export const actions = {
	default: async ({ request }) => {
		const data = await request.formData;
		return {
			contactSuccess: true
		};
	}
};
