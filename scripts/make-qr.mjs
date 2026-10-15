// Makes print-ready QR codes for the website.
//   node scripts/make-qr.mjs https://your-domain.com
// Writes qr/website-qr.png (2000px, for print) and qr/website-qr.svg (scales to any size).
import { mkdirSync } from "node:fs";
import QRCode from "qrcode";

const url = process.argv[2] ?? "https://tourntravel-brown.vercel.app/";
mkdirSync("qr", { recursive: true });
const opts = { errorCorrectionLevel: "H", margin: 4, color: { dark: "#1d1a16", light: "#ffffff" } };
await QRCode.toFile("qr/website-qr.png", url, { ...opts, width: 2000 });
await QRCode.toFile("qr/website-qr.svg", url, { ...opts, type: "svg" });
console.log("QR codes written to qr/ for", url);
