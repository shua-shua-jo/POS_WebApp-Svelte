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

export const refresh = async (time) =>
	toast.push(
		`<div style="display: flex; align-items:center; gap:1em;"><span class="updating"></span><span class="content">Updating Data...<small style="color:#E3EBF8">${time}</small></span></div>
		<style>.updating {
			width: 20px;
			height: 20px;
			border: 3px solid #FFF;
			border-bottom-color: #2000C3;
			border-radius: 50%;
			display: inline-block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			}
			.content{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
	
			@keyframes rotation {
			0% {
					transform: rotate(0deg);
			}
			100% {
					transform: rotate(360deg);
			}
			} </style>
		`,
		{
			dismissable: false,
			theme: {
				'--toastBackground': '#3A19E6',
				'--toastBarBackground': '#2000C3'
			}
		}
	);

export const sending = (content) => {
	const id = toast.push(
		`<div style="display: flex; align-items:center; gap:1em;"><span class="updating"></span><span>Processing ${content}...</span></div>
		<style>.updating {
			width: 20px;
			height: 20px;
			border: 3px solid #FFF;
			border-bottom-color: #FF8400;
			border-radius: 50%;
			display: inline-block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
			}
	
			@keyframes rotation {
			0% {
					transform: rotate(0deg);
			}
			100% {
					transform: rotate(360deg);
			}
			} </style>
		`,
		{
			dismissable: false,
			initial: 0,
			theme: {
				'--toastBackground': '#FF9C33',
				'--toastBarHeight': 0
			}
		}
	);
	return id;
};
