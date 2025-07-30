navigator.mediaDevices.getDisplayMedia({ video: true })
  .then(stream => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Wait for video to be ready
    video.onloadedmetadata = () => {
      setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        canvas.toBlob(blob => {
          const formData = new FormData();
          formData.append("screenshot", blob, "screenshot.png");

          fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
          });
        }, "image/png");
      }, 5000); // every 5 seconds
    };
  })
  .catch(err => alert("Screen capture failed: " + err));
