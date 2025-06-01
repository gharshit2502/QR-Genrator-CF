
// const form = document.getElementById("qr-form");
// const input = document.getElementById("inptxt");
// const img = document.getElementById("qrimg");
// const spinner = document.querySelector(".spinner");
// const dl = document.getElementById("download-btn");
// const btn = form.querySelector("button");
// const toggleBtn = document.getElementById("mode-toggle");
 
// let canvasForDownload = null;

// form.addEventListener("submit", (e) => {
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
//   const size = 300; 
//   const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;
 
//   img.hidden = true;
//   dl.hidden = true;       
//   spinner.hidden = false;
//   btn.disabled = true;

//   img.onload = () => {
//     spinner.hidden = true;
//     img.hidden = false;
//     dl.hidden = false;
//     btn.disabled = false;
 
//     canvasForDownload = document.createElement("canvas");
//     canvasForDownload.width = size;
//     canvasForDownload.height = size;
//     const ctx = canvasForDownload.getContext("2d");
//     ctx.drawImage(img, 0, 0, size, size);

//     console.log("✅ QR code generated and ready for download!");
//   };

//   img.onerror = () => {
//     spinner.hidden = true;
//     btn.disabled = false;
//     alert("❌ Failed to generate QR code. Please try again.");
//   };
 
//   img.src = url;
// });

// dl.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (!canvasForDownload) {
//     alert("⚠️ Please generate a QR code first.");
//     return;
//   }
 
//   canvasForDownload.toBlob((blob) => {
//     const blobUrl = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = blobUrl;
//     a.download = "qr-code.png";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a); 
//     setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
//   }, "image/png");
// });

// toggleBtn.addEventListener("click", () => {
//   document.body.classList.toggle("night");
//   toggleBtn.textContent = document.body.classList.contains("night")
//     ? "☀️ Light Mode"
//     : "🌙 Night Mode";
// });


const form = document.getElementById("qr-form");
const input = document.getElementById("inptxt");
const qrContainer = document.getElementById("qrimg");
const spinner = document.querySelector(".spinner");
const dl = document.getElementById("download-btn");
const btn = form.querySelector("button");
const toggleBtn = document.getElementById("mode-toggle");

let currentQRCanvas = null;

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

  // Clear previous QR
  qrContainer.innerHTML = "";
  dl.hidden = true;
  spinner.hidden = false;
  btn.disabled = true;

  setTimeout(() => {
    const qr = new QRCode(qrContainer, {
      text: txt,
      width: 300,
      height: 300,
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Wait for QR to render (async delay)
    setTimeout(() => {
      const canvas = qrContainer.querySelector("canvas");
      if (canvas) {
        currentQRCanvas = canvas;
        dl.hidden = false;
        console.log("✅ QR code ready for download.");
      } else {
        alert("❌ Failed to render QR code.");
      }
      spinner.hidden = true;
      btn.disabled = false;
    }, 100);
  }, 100);
});

dl.addEventListener("click", (e) => {
  e.preventDefault();
  if (!currentQRCanvas) {
    alert("⚠️ Please generate a QR code first.");
    return;
  }

  const a = document.createElement("a");
  a.href = currentQRCanvas.toDataURL("image/png");
  a.download = "qr-code.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");
  toggleBtn.textContent = document.body.classList.contains("night")
    ? "☀️ Light Mode"
    : "🌙 Night Mode";
});
