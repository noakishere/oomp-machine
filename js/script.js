let device, context;
let patchExportURL = "export/euclidean-beats.export.json";

// --- Master DOM Elements ---
const masterVolumeDOM = document.getElementById("masterVolume");
const masterVolumeLabel = document.getElementById("masterVolumeLabel");

// --- Kick DOM Elements ---
const kickGainDOM = document.getElementById("kickGain");
const kickStepsDOM = document.getElementById("kickSteps");
const kickPulsesDOM = document.getElementById("kickPulses");
const kickRotatesDOM = document.getElementById("kickRotates");

const kickGainLabel = document.getElementById("kickGainLabel");
const kickStepsLabel = document.getElementById("kickStepsLabel");
const kickPulsesLabel = document.getElementById("kickPulsesLabel");
const kickRotatesLabel = document.getElementById("kickRotatesLabel");

// --- Snare DOM Elements ---
const snareGainDOM = document.getElementById("snareGain");
const snareStepsDOM = document.getElementById("snareSteps");
const snarePulsesDOM = document.getElementById("snarePulses");
const snareRotatesDOM = document.getElementById("snareRotates");

const snareGainLabel = document.getElementById("snareGainLabel");
const snareStepsLabel = document.getElementById("snareStepsLabel");
const snarePulsesLabel = document.getElementById("snarePulsesLabel");
const snareRotatesLabel = document.getElementById("snareRotatesLabel");

// --- Hihat DOM Elements ---
const hihatGainDOM = document.getElementById("hihatGain");
const hihatStepsDOM = document.getElementById("hihatSteps");
const hihatPulsesDOM = document.getElementById("hihatPulses");
const hihatRotatesDOM = document.getElementById("hihatRotates");

const hihatGainLabel = document.getElementById("hihatGainLabel");
const hihatStepsLabel = document.getElementById("hihatStepsLabel");
const hihatPulsesLabel = document.getElementById("hihatPulsesLabel");
const hihatRotatesLabel = document.getElementById("hihatRotatesLabel");

const sequencerGainDOM = document.getElementById("sequencerGain");
const attackDOM = document.getElementById("attack");
const decayDOM = document.getElementById("decay");
const sustainDOM = document.getElementById("sustain");
const phaserFreqDOM = document.getElementById("phaserFreq");

const sequencerGainLabel = document.getElementById("sequencerGainLabel");
const attackLabel = document.getElementById("attackLabel");
const decayLabel = document.getElementById("decayLabel");
const sustainLabel = document.getElementById("sustainLabel");
const phaserFreqLabel = document.getElementById("phaserFreqLabel");

// Select slider DOM elements for Cycle Sequencer 2
const sequencer2GainDOM = document.getElementById("sequencer2Gain");
const attack2DOM = document.getElementById("attack2");
const decay2DOM = document.getElementById("decay2");
const sustain2DOM = document.getElementById("sustain2");

// Select label elements for Cycle Sequencer 2
const sequencer2GainLabel = document.getElementById("sequencer2GainLabel");
const attack2Label = document.getElementById("attack2Label");
const decay2Label = document.getElementById("decay2Label");
const sustain2Label = document.getElementById("sustain2Label");

async function loadRNBO() {
	[device, context] = await createRNBODevice(patchExportURL);
	console.log("RNBO Device Loaded");
	// console.log(` MESSAGES ${device.messages}`);
}

loadRNBO();

function setup() {}

function updateLabels() {
	masterVolumeLabel.innerHTML = `Volume ${masterVolumeDOM.value}`;

	kickStepsLabel.innerHTML = `Steps ${kickStepsDOM.value}`;
	kickPulsesLabel.innerHTML = `Pulses ${kickPulsesDOM.value}`;
	kickRotatesLabel.innerHTML = `Rotates ${kickRotatesDOM.value}`;

	snareStepsLabel.innerHTML = `Steps ${snareStepsDOM.value}`;
	snarePulsesLabel.innerHTML = `Pulses ${snarePulsesDOM.value}`;
	snareRotatesLabel.innerHTML = `Rotates ${snareRotatesDOM.value}`;

	hihatStepsLabel.innerHTML = `Steps ${hihatStepsDOM.value}`;
	hihatPulsesLabel.innerHTML = `Pulses ${hihatPulsesDOM.value}`;
	hihatRotatesLabel.innerHTML = `Rotates ${hihatRotatesDOM.value}`;
}

masterVolumeDOM.addEventListener("input", () => {
	sendMessageToInport(device, "master-volume", masterVolumeDOM.value);
	updateLabels();
});

const kickPresetInput = document.getElementById("kickPreset");
if (kickPresetInput) {
	kickPresetInput.addEventListener("input", () => {
		sendMessageToInport(device, "kick-preset", kickPresetInput.value);
	});
}

// Snare Preset
const snarePresetInput = document.getElementById("snarePreset");
if (snarePresetInput) {
	snarePresetInput.addEventListener("input", () => {
		sendMessageToInport(device, "snare-preset", snarePresetInput.value);
	});
}

// Hihat Preset
const hihatPresetInput = document.getElementById("hihatPreset");
if (hihatPresetInput) {
	hihatPresetInput.addEventListener("input", () => {
		sendMessageToInport(device, "hihat-preset", hihatPresetInput.value);
	});
}

// --- Kick Event Listeners ---
kickGainDOM.addEventListener("input", () => {
	sendMessageToInport(device, "kick-gain", kickGainDOM.value);
	updateLabels();
});

kickStepsDOM.addEventListener("input", () => {
	sendMessageToInport(device, "kick-steps", kickStepsDOM.value);
	updateLabels();
});

kickPulsesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "kick-pulses", kickPulsesDOM.value);
	updateLabels();
});

kickRotatesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "kick-rot", kickRotatesDOM.value);
	updateLabels();
});

// --- Snare Event Listeners ---
snareGainDOM.addEventListener("input", () => {
	sendMessageToInport(device, "snare-gain", snareGainDOM.value);
	// console.log(snareGainDOM.value);
	updateLabels();
});

snareStepsDOM.addEventListener("input", () => {
	sendMessageToInport(device, "snare-steps", snareStepsDOM.value);
	updateLabels();
});

snarePulsesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "snare-pulses", snarePulsesDOM.value);
	updateLabels();
});

snareRotatesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "snare-rot", snareRotatesDOM.value);
	updateLabels();
});

// --- Hihat Event Listeners ---
hihatGainDOM.addEventListener("input", () => {
	sendMessageToInport(device, "test-gain", hihatGainDOM.value);
	// console.log(hihatGainDOM.value);
	updateLabels();
});

hihatStepsDOM.addEventListener("input", () => {
	sendMessageToInport(device, "hihat-steps", hihatStepsDOM.value);
	updateLabels();
});

hihatPulsesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "hihat-pulses", hihatPulsesDOM.value);
	updateLabels();
});

hihatRotatesDOM.addEventListener("input", () => {
	sendMessageToInport(device, "hihat-rot", hihatRotatesDOM.value);
	updateLabels();
});

// --- Initial Update ---
updateLabels();

sequencerGainDOM.addEventListener("input", () => {
	sequencerGainLabel.innerHTML = `Sequencer Gain: ${sequencerGainDOM.value}`;
	sendMessageToInport(device, "sequencer-gain", sequencerGainDOM.value);
});

attackDOM.addEventListener("input", () => {
	attackLabel.innerHTML = `Attack: ${attackDOM.value}`;
	sendMessageToInport(device, "attack", attackDOM.value);
});

decayDOM.addEventListener("input", () => {
	decayLabel.innerHTML = `Decay: ${decayDOM.value}`;
	sendMessageToInport(device, "decay", decayDOM.value);
});

sustainDOM.addEventListener("input", () => {
	sustainLabel.innerHTML = `Sustain: ${sustainDOM.value}`;
	sendMessageToInport(device, "sustain", sustainDOM.value);
});

phaserFreqDOM.addEventListener("input", () => {
	phaserFreqLabel.innerHTML = `Phaser Frequency: ${phaserFreqDOM.value}`;
	sendMessageToInport(device, "phaser-freq", phaserFreqDOM.value);
});

sequencer2GainDOM.addEventListener("input", () => {
	sequencer2GainLabel.innerHTML = `Sequencer Gain: ${sequencer2GainDOM.value}`;
	sendMessageToInport(device, "sequencer2-gain", sequencer2GainDOM.value);
});

// PATTERNS

function updatePattern(instrument, patternArray) {
	const container = document.getElementById(instrument + "Pattern");
	if (!container) return;

	// Clear any existing content
	container.innerHTML = "";

	// Use the fixed container size (150px) from CSS
	const containerSize = container.clientWidth;

	// Calculate a larger radius for placing circles (80% of half the container width)
	const radius = (containerSize / 2) * 0.8;
	const centerX = containerSize / 2;
	const centerY = containerSize / 2;

	// Calculate a small circle size (8% of container width)
	const circleSize = containerSize * 0.08;

	const n = patternArray.length;

	// Place each circle evenly around the circle
	patternArray.forEach((val, i) => {
		const circle = document.createElement("div");
		circle.classList.add("pattern-square");
		circle.classList.add(val === 1 ? "active" : "inactive");

		// Calculate the angle for even distribution
		const angle = (2 * Math.PI * i) / n;
		const left = centerX + radius * Math.cos(angle) - circleSize / 2;
		const top = centerY + radius * Math.sin(angle) - circleSize / 2;

		circle.style.width = circleSize + "px";
		circle.style.height = circleSize + "px";
		circle.style.left = left + "px";
		circle.style.top = top + "px";

		container.appendChild(circle);
	});
}

// -- SEQUENCERS

function updateSequencer1Pattern() {
	// Select all inputs within the first sequencer's number grid that start with "num"
	const inputs = document.querySelectorAll(
		"fieldset.sequencer .number-grid input.number-input[id^='num']"
	);
	// Bundle all values into one space-separated string
	const valueString = Array.from(inputs)
		.map((input) => input.value)
		.join(" ");
	// Send the bundled string to the RNBO inport (update the tag as needed)
	sendMessageToInport(device, "sequencer-pattern", valueString);
}

function updateSequencer2Pattern() {
	// Select all inputs within the second sequencer's number grid that start with "seq2"
	const inputs = document.querySelectorAll(
		"fieldset.sequencer .number-grid input.number-input[id^='seq2']"
	);
	// Bundle all values into one space-separated string
	const valueString = Array.from(inputs)
		.map((input) => input.value)
		.join(" ");
	// Send the bundled string to the RNBO inport (update the tag as needed)
	sendMessageToInport(device, "sequencer2-pattern", valueString);
}

const seq1Inputs = document.querySelectorAll(
	"fieldset.sequencer .number-grid input.number-input[id^='num']"
);

seq1Inputs.forEach((input) => {
	input.addEventListener("input", updateSequencer1Pattern);
});

const seq2Inputs = document.querySelectorAll(
	"fieldset.sequencer .number-grid input.number-input[id^='seq2']"
);
seq2Inputs.forEach((input) => {
	input.addEventListener("input", updateSequencer2Pattern);
});

updateSequencer1Pattern();
updateSequencer2Pattern();
