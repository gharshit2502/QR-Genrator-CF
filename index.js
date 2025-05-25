// function handleSubmit(event) {
//     event.preventDefault();
//     let text = document.getElementById("inptxt").value;
//     let qrsrc = 
//         `http://api.qrserver.com/v1/create-qr-code/?data=${text}`;
//     let qrimg = document.getElementById("qrimg");
//     qrimg.src = qrsrc;
// }
// index.js
const form = document.getElementById("qr-form");
const input = document.getElementById("inptxt");
const img = document.getElementById("qrimg");
const spinner = document.querySelector(".spinner");
const dl = document.getElementById("download-btn");

form.addEventListener("submit", e => {
  e.preventDefault();
  const txt = input.value.trim();
  if (!txt) return input.focus();

  const data = encodeURIComponent(txt);
  const size = "300x300";
  const url  = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`;

  img.hidden = dl.hidden = true;
  spinner.hidden = false;
  img.onload = () => {
    spinner.hidden = true;
    img.hidden = false;
    dl.href = url;
    dl.hidden = false;
  };
  img.onerror = () => {
    spinner.hidden = true;
    alert("Failed to generate QR. Try again.");
  };
  img.src = url;
});
