'use client';

import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToTextComponent = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // const [isFirstRender, setIsFirstRender] = useState(true);

  // useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //     SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
  //   }
  // }, [isFirstRender]);

  useEffect(() => {
    if (transcript) {
      const timeoutId = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 2500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Bộ trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản.</span>;
  }

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
  };

  return (
    <div>
      <div>
        <button onClick={handleStartListening} disabled={listening}>Bắt đầu nghe</button>
        <button onClick={handleStopListening} disabled={!listening}>Dừng nghe</button>
        <button onClick={resetTranscript}>Xóa</button>
      </div>
      <div>
        <p>{transcript}</p>
      </div>
      {listening && <p>Đang nghe...</p>}
    </div>
  );
};

export default SpeechToTextComponent;
