let device, context;
let patchExportURL = "export/euclidean-beats.export.json";

let stepsDOM = document.querySelector("#steps");
let pulsesDOM = document.querySelector("#pulses");
let rotDOM = document.querySelector("#rotates");

async function loadRNBO() {
	[device, context] = await createRNBODevice(patchExportURL);
	console.log("RNBO Device Loaded");
	console.log(` MESSAGES ${device.messages}`);

	// device.messageEvent.subscribe((ev) => {
	// 	console.log(`Received message ${ev.tag}: ${ev.payload}`);

	// 	if (ev.tag === "info") console.log("from the first outlet");
	// });
}

loadRNBO();

document.getElementById("stepsLabel").innerHTML = `Steps ${stepsDOM.value}`;
document.getElementById("pulsesLabel").innerHTML = `Pulses ${pulsesDOM.value}`;
document.getElementById("rotatesLabel").innerHTML = `Rotates ${rotDOM.value}`;

stepsDOM.addEventListener("input", () => {
	// console.log(stepsDOM.value);
	document.getElementById("stepsLabel").innerHTML = `Steps: ${stepsDOM.value}`;

	sendMessageToInport(device, "kick-steps", stepsDOM.value);
});

pulsesDOM.addEventListener("input", () => {
	document.getElementById("pulsesLabel").innerHTML = `Pulses: ${pulsesDOM.value}`;
	sendMessageToInport(device, "kick-pulses", pulsesDOM.value);
});

rotDOM.addEventListener("input", () => {
	document.getElementById("rotatesLabel").innerHTML = `Rotates: ${rotDOM.value}`;
	sendMessageToInport(device, "kick-rot", rotDOM.value);
});

// function enumerate() {
// 	// console.log(device);
// 	device.parameters.forEach((parameter) => {
// 		// Each parameter has an ID as well as a name. The ID will include
// 		// the full path to the parameter, including the names of any parent
// 		// patchers if the parameter is in a subpatcher. So if the path contains
// 		// any "/" characters, you know that it's not a top level parameter.

// 		// Uncomment this line to include only top level parameters.
// 		// if (parameter.id.includes("/")) return;

// 		console.log(parameter.id);
// 		console.log(parameter.name);
// 	});
// }
