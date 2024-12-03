export default function decodeBase64(encoded) {
	console.log("Decoding base64 data...");
	return `data:image/png;base64,${encoded}`;
}
