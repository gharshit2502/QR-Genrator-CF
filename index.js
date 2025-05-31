// const form = document.getElementById("qr-form");
// const input = document.getElementById("inptxt");
// const img = document.getElementById("qrimg");
// const spinner = document.querySelector(".spinner");
// const dl = document.getElementById("download-btn");
// const btn = form.querySelector("button");
// const toggleBtn = document.getElementById("mode-toggle");

// form.addEventListener("submit", e => {
//   e.preventDefault();

//   const txt = input.value.trim();
//   if (!txt) {
//     input.focus();
//     return;
//   }

//   if (txt.length > 300) {
//     alert("Text too long for QR code. Try shortening it.");
//     return;
//   }

//   const data = encodeURIComponent(txt);
//   const size = "300x300";
//   const url  = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`;

//   // Reset UI states
//   img.hidden = dl.hidden = true;
//   spinner.hidden = false;
//   btn.disabled = true;

//   img.onload = () => {
//     spinner.hidden = true;
//     img.hidden = false;
//     dl.hidden = false;
//     btn.disabled = false;

//     // Create canvas to convert image for download
//     const canvas = document.createElement("canvas");
//     canvas.width = img.naturalWidth;
//     canvas.height = img.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     // Set download link to canvas data URL
//     dl.href = canvas.toDataURL("image/png");
//     dl.download = "qr-code.png";

//     console.log("QR code generated and ready to download!");
//   };

//   img.onerror = () => {
//     spinner.hidden = true;
//     btn.disabled = false;
//     alert("Failed to generate QR code. Please try again.");
//   };

//   img.src = url;
// });

// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("night");
//   toggleBtn.textContent = document.body.classList.contains("night")
//     ? "☀️ Light Mode"
//     : "🌙 Night Mode";
// });

// dl.addEventListener("click", e => {
//   if (!dl.href || dl.href === "#") {
//     e.preventDefault();
//     alert("Please generate a QR code first.");
//   }
// });
const form = document.getElementById("qr-form");
const input = document.getElementById("inptxt");
const img = document.getElementById("qrimg");
const spinner = document.querySelector(".spinner");
const dl = document.getElementById("download-btn");
const btn = form.querySelector("button");
const toggleBtn = document.getElementById("mode-toggle");

// We’ll store the generated canvas here so the download handler can use it:
let canvasForDownload = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const txt = input.value.trim();
  if (!txt) {
    input.focus();
    return;
  }
  if (txt.length > 300) {
    alert("Text too long for QR code. Try shortening it.");
    return;
  }

  const data = encodeURIComponent(txt);
  const size = 300; // we’ll pass “300x300” to the API
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;

  // Reset UI states:
  img.hidden = true;
  dl.hidden = true;      // hide download until we have a proper canvas
  spinner.hidden = false;
  btn.disabled = true;

  // When the <img> finishes loading, draw it to a canvas:
  img.onload = () => {
    spinner.hidden = true;
    img.hidden = false;
    dl.hidden = false;
    btn.disabled = false;

    // Create an off-screen canvas and draw the loaded QR image onto it
    canvasForDownload = document.createElement("canvas");
    canvasForDownload.width = size;
    canvasForDownload.height = size;
    const ctx = canvasForDownload.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);

    console.log("✅ QR code generated and ready for download!");
  };

  img.onerror = () => {
    spinner.hidden = true;
    btn.disabled = false;
    alert("❌ Failed to generate QR code. Please try again.");
  };

  // Trigger the image load from the API
  img.src = url;
});

dl.addEventListener("click", (e) => {
  e.preventDefault();
  if (!canvasForDownload) {
    alert("⚠️ Please generate a QR code first.");
    return;
  }

  // Convert canvas to a binary PNG blob, then create a temporary URL and click it
  canvasForDownload.toBlob((blob) => {
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke the object URL after a short delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  }, "image/png");
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");
  toggleBtn.textContent = document.body.classList.contains("night")
    ? "☀️ Light Mode"
    : "🌙 Night Mode";
});
