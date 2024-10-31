const video = document.getElementById("video");
const startCapture = document.getElementById("startCapture");
const faceDataInput = document.getElementById("faceData");
const canvas = require('face-api.js')

// Start video stream
startCapture.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Capture a snapshot after 5 seconds
    setTimeout(() => {
      captureSnapshot(stream);
    }, 5000);
  } catch (err) {
    console.error("Error accessing camera: ", err);
  }
});

// Capture image from the video stream
function captureSnapshot(stream) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert the image to data URL and store it in the hidden input
  const dataUrl = canvas.toDataURL("image/png");
  faceDataInput.value = dataUrl;

  console.log(dataUrl);
  // Stop the video stream
  stream.getTracks().forEach((track) => track.stop());
  video.srcObject = null; // Clear video element
}
