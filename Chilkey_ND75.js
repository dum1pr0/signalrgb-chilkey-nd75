// Chilkey ND75 (wired USB, 36B5:2BA7) - SignalRGB plugin
// Protocol recovered from the vendor "ND75 Driver" (DeviceDriver.exe):
//   HID interface 3, usage page 0xFF13, usage 0x01, 65-byte feature reports (report ID 0).
//   Live per-key colour (the driver's real-time preview path, no flash write):
//     04 20 00 00 00 00 00 00 08      -> header, 8 data packets follow
//     8 x 64 bytes                    -> [ledIndex, R, G, B] per LED, slot = ledIndex * 4
//     04 02                           -> apply
//   LED indexes come from the driver's layouts/rgb-keyboard.xml.
export function Name() { return "Chilkey ND75"; }
export function VendorId() { return 0x36B5; }
export function ProductId() { return 0x2BA7; }
export function Publisher() { return "Dum1"; }
export function Size() { return [16, 6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 8.0; }
export function DeviceType() { return "keyboard"; }
export function ConflictingProcesses() { return ["DeviceDriver.exe"]; }
export function ImageUrl() { return "https://chilkey.com/cdn/shop/files/ND75_Black_Front.png?v=1735011442&width=990"; }

/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
	return [
		{ property: "shutdownColor", group: "lighting", label: "Shutdown Color", description: "Color applied when SignalRGB or the system shuts down", min: "0", max: "360", type: "color", default: "#000000" },
		{ property: "LightingMode", group: "lighting", label: "Lighting Mode", description: "Canvas uses the active effect, Forced uses a single color", type: "combobox", values: ["Canvas", "Forced"], default: "Canvas" },
		{ property: "forcedColor", group: "lighting", label: "Forced Color", description: "Color used when Lighting Mode is Forced", min: "0", max: "360", type: "color", default: "#009bde" },
	];
}

const KEYS = [
	{ name: "Esc", index: 1, x: 0, y: 0 },
	{ name: "F1", index: 2, x: 1, y: 0 },
	{ name: "F2", index: 3, x: 2, y: 0 },
	{ name: "F3", index: 4, x: 3, y: 0 },
	{ name: "F4", index: 5, x: 4, y: 0 },
	{ name: "F5", index: 6, x: 5, y: 0 },
	{ name: "F6", index: 7, x: 6, y: 0 },
	{ name: "F7", index: 8, x: 8, y: 0 },
	{ name: "F8", index: 9, x: 9, y: 0 },
	{ name: "F9", index: 10, x: 10, y: 0 },
	{ name: "F10", index: 11, x: 11, y: 0 },
	{ name: "F11", index: 12, x: 12, y: 0 },
	{ name: "F12", index: 13, x: 13, y: 0 },
	{ name: "Delete", index: 119, x: 14, y: 0 },
	{ name: "Insert", index: 116, x: 15, y: 0 },
	{ name: "`", index: 19, x: 0, y: 1 },
	{ name: "1", index: 20, x: 1, y: 1 },
	{ name: "2", index: 21, x: 2, y: 1 },
	{ name: "3", index: 22, x: 3, y: 1 },
	{ name: "4", index: 23, x: 4, y: 1 },
	{ name: "5", index: 24, x: 5, y: 1 },
	{ name: "6", index: 25, x: 6, y: 1 },
	{ name: "7", index: 26, x: 7, y: 1 },
	{ name: "8", index: 27, x: 8, y: 1 },
	{ name: "9", index: 28, x: 9, y: 1 },
	{ name: "0", index: 29, x: 10, y: 1 },
	{ name: "-_", index: 30, x: 11, y: 1 },
	{ name: "=+", index: 31, x: 12, y: 1 },
	{ name: "Backspace", index: 103, x: 13, y: 1 },
	{ name: "Page Up", index: 118, x: 15, y: 1 },
	{ name: "Tab", index: 37, x: 0, y: 2 },
	{ name: "Q", index: 38, x: 1, y: 2 },
	{ name: "W", index: 39, x: 2, y: 2 },
	{ name: "E", index: 40, x: 3, y: 2 },
	{ name: "R", index: 41, x: 4, y: 2 },
	{ name: "T", index: 42, x: 5, y: 2 },
	{ name: "Y", index: 43, x: 6, y: 2 },
	{ name: "U", index: 44, x: 7, y: 2 },
	{ name: "I", index: 45, x: 8, y: 2 },
	{ name: "O", index: 46, x: 9, y: 2 },
	{ name: "P", index: 47, x: 10, y: 2 },
	{ name: "[", index: 48, x: 11, y: 2 },
	{ name: "]", index: 49, x: 12, y: 2 },
	{ name: "\\", index: 67, x: 14, y: 2 },
	{ name: "Page Down", index: 121, x: 15, y: 2 },
	{ name: "CapsLock", index: 55, x: 0, y: 3 },
	{ name: "A", index: 56, x: 2, y: 3 },
	{ name: "S", index: 57, x: 3, y: 3 },
	{ name: "D", index: 58, x: 4, y: 3 },
	{ name: "F", index: 59, x: 5, y: 3 },
	{ name: "G", index: 60, x: 6, y: 3 },
	{ name: "H", index: 61, x: 7, y: 3 },
	{ name: "J", index: 62, x: 8, y: 3 },
	{ name: "K", index: 63, x: 9, y: 3 },
	{ name: "L", index: 64, x: 10, y: 3 },
	{ name: ";", index: 65, x: 11, y: 3 },
	{ name: "'", index: 66, x: 12, y: 3 },
	{ name: "Enter", index: 85, x: 13, y: 3 },
	{ name: "Left Shift", index: 73, x: 0, y: 4 },
	{ name: "Z", index: 74, x: 2, y: 4 },
	{ name: "X", index: 75, x: 3, y: 4 },
	{ name: "C", index: 76, x: 4, y: 4 },
	{ name: "V", index: 77, x: 5, y: 4 },
	{ name: "B", index: 78, x: 6, y: 4 },
	{ name: "N", index: 79, x: 7, y: 4 },
	{ name: "M", index: 80, x: 8, y: 4 },
	{ name: ",", index: 81, x: 9, y: 4 },
	{ name: ".", index: 82, x: 10, y: 4 },
	{ name: "/", index: 83, x: 11, y: 4 },
	{ name: "Right Shift", index: 84, x: 13, y: 4 },
	{ name: "Up Arrow", index: 101, x: 14, y: 4 },
	{ name: "Left Ctrl", index: 91, x: 0, y: 5 },
	{ name: "Left Win", index: 92, x: 1, y: 5 },
	{ name: "Left Alt", index: 93, x: 2, y: 5 },
	{ name: "Space", index: 94, x: 6, y: 5 },
	{ name: "Fn", index: 96, x: 10, y: 5 },
	{ name: "Right Ctrl", index: 98, x: 11, y: 5 },
	{ name: "Left Arrow", index: 99, x: 13, y: 5 },
	{ name: "Down Arrow", index: 100, x: 14, y: 5 },
	{ name: "Right Arrow", index: 102, x: 15, y: 5 },
];

const vLedNames = KEYS.map(k => k.name);
const vLedPositions = KEYS.map(k => [k.x, k.y]);

export function LedNames() { return vLedNames; }
export function LedPositions() { return vLedPositions; }

export function Validate(endpoint) {
	return endpoint.interface === 3 && endpoint.usage_page === 0xFF13;
}

export function Initialize() {
	device.set_endpoint(3, 0x0001, 0xFF13);
}

export function Render() {
	sendColors();
}

export function Shutdown(SystemSuspending) {
	sendColors(SystemSuspending ? "#000000" : shutdownColor);
}

function sendColors(overrideColor) {
	const rgb = new Array(512).fill(0);

	for (let i = 0; i < KEYS.length; i++) {
		const key = KEYS[i];
		let color;

		if (overrideColor) {
			color = hexToRgb(overrideColor);
		} else if (LightingMode === "Forced") {
			color = hexToRgb(forcedColor);
		} else {
			color = device.color(key.x, key.y);
		}

		const o = key.index * 4;
		rgb[o] = key.index;
		rgb[o + 1] = color[0];
		rgb[o + 2] = color[1];
		rgb[o + 3] = color[2];
	}

	// Header: live colour upload, 8 packets of 64 bytes follow
	device.send_report([0x00, 0x04, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08], 65);
	device.get_report([0x00], 65);

	for (let p = 0; p < 8; p++) {
		device.send_report([0x00].concat(rgb.slice(p * 64, p * 64 + 64)), 65);
		device.pause(2);
	}

	// Apply
	device.send_report([0x00, 0x04, 0x02], 65);
	device.get_report([0x00], 65);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
}
