
// record user's voice
let mediaRecorder;
let audioChunks = [];
const recordingStatus = document.getElementById("recordingStatus");

document.getElementById("startRecord").addEventListener("click", function(){
  navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      updateRecordingUI(true);

      mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
      });
  });
});

document.getElementById("stopRecord").addEventListener("click", function(){
  mediaRecorder.stop();
  updateRecordingUI(false);

  mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

      // Send the blob to the server
      uploadRecording(audioBlob);
  });
});

function updateRecordingUI(isRecording) {
  if (isRecording) {
      document.getElementById("startRecord").disabled = true;
      document.getElementById("stopRecord").disabled = false;
      recordingStatus.textContent = "Recording...";
      recordingStatus.style.color = "red";
  } else {
      document.getElementById("startRecord").disabled = false;
      document.getElementById("stopRecord").disabled = true;
      recordingStatus.textContent = "";
  }
}

function downloadAudioBlob(blob, filename) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

function uploadRecording(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");


  fetch('/upload', {
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
