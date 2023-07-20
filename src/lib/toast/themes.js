import { toast } from '@zerodevx/svelte-toast';

export const success = async (m) =>
	toast.push(
		`<div style="display: flex; align-items:center; gap:1em;"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg><span>${m}</span></div>`,
		{
			theme: {
				'--toastBackground': '#148D30',
				'--toastBarBackground': 'var(--upcolor_green)'
			}
		}
	);

export const failed = async (m) =>
	toast.push(
		`<div style="display: flex; align-items:center; gap:1em;"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="currentColor" d="M18 2.1a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-1.4 6.7a1.4 1.4 0 0 1 2.8 0v12a1.4 1.4 0 0 1-2.8 0ZM18 28.6a1.8 1.8 0 1 1 1.8-1.8a1.8 1.8 0 0 1-1.8 1.8Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg><span>${m}</span></div>`,
		{
			theme: {
				'--toastBackground': '#B8004D',
				'--toastBarBackground': 'var(--upcolor_maroon)'
			}
		}
	);
