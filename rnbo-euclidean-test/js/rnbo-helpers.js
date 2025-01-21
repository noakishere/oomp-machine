async function createRNBODevice(patchExportURL) {
	// Create AudioContext
	const WAContext = window.AudioContext || window.webkitAudioContext;
	const context = new WAContext();

	// Create gain node and connect it to audio output
	const outputNode = context.createGain();
	outputNode.connect(context.destination);

	// Fetch the exported patcher
	let response, patcher;
	try {
		response = await fetch(patchExportURL);
		patcher = await response.json();

		if (!window.RNBO) {
			// Load RNBO script dynamically
			// Note that you can skip this by knowing the RNBO version of your patch
			// beforehand and just include it using a <script> tag
			await loadRNBOScript(patcher.desc.meta.rnboversion);
		}
	} catch (err) {
		const errorContext = {
			error: err,
		};
		if (response && (response.status >= 300 || response.status < 200)) {
			(errorContext.header = `Couldn't load patcher export bundle`),
				(errorContext.description =
					`Check app.js to see what file it's trying to load. Currently it's` +
					` trying to load "${patchExportURL}". If that doesn't` +
					` match the name of the file you exported from RNBO, modify` +
					` patchExportURL in app.js.`);
		}
		throw err;
	}

	// Create the device
	let device;
	try {
		device = await RNBO.createDevice({ context, patcher });
	} catch (err) {
		throw err;
	}

	// Connect the device to the web audio graph
	device.node.connect(outputNode);

	document.body.onclick = () => {
		context.resume();
		console.log(context.state);
		// attachOutports(device);
	};

	const inports = getInports(device);
	console.log("Inports:");
	console.log(inports);
	const parameters = getParameters(device);
	console.log("Parameters");
	parameters.forEach((param) => {
		console.log(param);
	});

	attachOutports(device);

	// console.log(`DEVICEEEE ${device.messagePort}`);

	return [device, context];
}

function changeSteps(steps) {
	const event1 = new MessageEvent(context.currentTime, "kick-steps", [steps]);
	device.scheduleEvent(event1);
	// let newSteps = [
	//     context.currentTime * 1000,
	//     "kick-steps",

	// ]
}

function loadRNBOScript(version) {
	return new Promise((resolve, reject) => {
		if (/^\d+\.\d+\.\d+-dev$/.test(version)) {
			throw new Error(
				"Patcher exported with a Debug Version!\nPlease specify the correct RNBO version to use in the code."
			);
		}
		const el = document.createElement("script");
		el.src =
			"https://c74-public.nyc3.digitaloceanspaces.com/rnbo/" +
			encodeURIComponent(version) +
			"/rnbo.min.js";
		el.onload = resolve;
		el.onerror = function (err) {
			console.log(err);
			reject(new Error("Failed to load rnbo.js v" + version));
		};
		document.body.append(el);
	});
}

function noteOn(rnboDevice, context, pitch, velocity) {
	let midiChannel = 0;
	let midiPort = 0;

	// Format a MIDI message payload, this constructs a MIDI note-on event
	let noteOnMessage = [
		144 + midiChannel, // Code for a note on: 10010000 & MIDI channel (0-15)
		pitch, // MIDI Note
		velocity, // MIDI Velocity
	];

	// When scheduling an event, use the current audio context time
	// multiplied by 1000 (converting seconds to milliseconds)
	let noteOnEvent = new RNBO.MIDIEvent(context.currentTime * 1000, midiPort, noteOnMessage);

	rnboDevice.scheduleEvent(noteOnEvent);
}

function noteOff(rnboDevice, context, pitch) {
	let midiChannel = 0;
	let midiPort = 0;

	// Format a MIDI message payload, this constructs a MIDI note-off event
	let noteOffMessage = [
		128 + midiChannel, // Code for a note on: 10010000 & MIDI channel (0-15)
		pitch, // MIDI Note
		0, // MIDI Velocity is 0 for a note off
	];

	// When scheduling an event, use the current audio context time
	// multiplied by 1000 (converting seconds to milliseconds)
	let noteOffEvent = new RNBO.MIDIEvent(context.currentTime * 1000, midiPort, noteOffMessage);

	rnboDevice.scheduleEvent(noteOffEvent);
}

// helper functions
function getInports(device) {
	const messages = device.messages;
	const inports = messages.filter((message) => message.type === RNBO.MessagePortType.Inport);
	return inports;
}

function getParameters(device) {
	const parameters = device.parameters;
	return parameters;
}

function getParameter(device, parameterName) {
	const parameters = device.parameters;
	const parameter = parameters.find((param) => param.name === parameterName);
	return parameter;
}

function sendMessageToInport(device, inportTag, values) {
	// Turn the text into a list of numbers (RNBO messages must be numbers, not text)
	const messsageValues = values.split(/\s+/).map((s) => parseFloat(s));

	// Send the message event to the RNBO device
	let messageEvent = new RNBO.MessageEvent(RNBO.TimeNow, inportTag, messsageValues);
	device.scheduleEvent(messageEvent);
}

function attachOutports(device) {
	const outports = device.outports;
	console.log(`OUTPORTS ${outports}`);
	// if (outports.length < 1) {
	// 	document
	// 		.getElementById("rnbo-console")
	// 		.removeChild(document.getElementById("rnbo-console-div"));
	// 	return;
	// }

	// document.getElementById("rnbo-console").removeChild(document.getElementById("no-outports-label"));
	device.messageEvent.subscribe((ev) => {
		// Ignore message events that don't belong to an outport
		// if (outports.findIndex((elt) => elt.tag === ev.tag) < 0) return;

		// Message events have a tag as well as a payload

		console.log(`${ev.tag}: ${ev.payload}`);
		console.log(ev);
		// document.getElementById("rnbo-console-readout").innerText = `${ev.tag}: ${ev.payload}`;
	});
}
