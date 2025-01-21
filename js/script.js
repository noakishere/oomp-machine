const patchExportURL = "export/patch-test.export.json";
let note = undefined;
let device, context;

let randomBtn = document.querySelector("#btn");

async function loadRNBO() {
	[device, context] = await createRNBODevice(patchExportURL);
	console.log("RNBO Device Loaded");
	console.log(device);
}

loadRNBO();

randomBtn.addEventListener("click", () => {
	note = Math.floor(Math.random() * 20) + 50;
	noteOn(device, context, note, 100);
	randomBtn.disabled = true;
	setTimeout(() => {
		noteOff(device, context, note);
		randomBtn.disabled = false;
	}, 500);
});
