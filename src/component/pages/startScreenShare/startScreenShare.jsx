import React, { useState, useRef } from 'react';

function ScreenShare() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Set the stream to the state and video element
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: '100%', height: 'auto' }}
        muted // Prevent feedback if you're sharing audio as well
      ></video>
      <button onClick={startScreenShare}>Start Screen Share</button>
      <button onClick={stopScreenShare}>Stop Screen Share</button>
    </div>
  );
}

export default ScreenShare;
