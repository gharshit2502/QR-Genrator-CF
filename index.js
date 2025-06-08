  

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
         canvas.classList.add("qr-appear");
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
    ? "☀️  Mode"
    : "🌙  Mode";
});
