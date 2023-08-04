import { json } from '@sveltejs/kit';
import { spawn } from 'child_process';

export async function POST({ request }) {
	const dataReq = await request.json();

	let dataToSend;
	const python = async () => {
		spawn('python', ['src/lib/scripts/script.py']);
	};
	// collect data from script
	await python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		dataToSend = data.toString() + dataReq.id.toString();
	});
	await python.stderr.on('data', (data) => {
		console.error('stderr: ', data.toString('utf8'));
	});
	console.log(dataToSend);
	// in close event we are sure that stream from child process is closed
	await python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
	});
	console.log('python closed');
	return json(dataToSend);
}
