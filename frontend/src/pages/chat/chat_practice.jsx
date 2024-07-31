import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { getFeedback, getAudioFeedback } from '../../api/ai_api';
import { getSubQuestion } from '../../api/learning_content_api';
import { getTTS } from '../../api/tts_api';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { HiSpeakerWave } from 'react-icons/hi2';

const ChatPracticeContent = forwardRef((_, ref) => {
  const location = useLocation();
  const { topic, question, id } = location.state || {};
  const navigate = useNavigate();
  const [answerInput, setAnswerInput] = useState('');

  const [Questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [activeMicButton, setActiveMicButton] = useState(true);
  const [activeStopButton, setActiveStopButton] = useState(false);
  const [activeSendButton, setActiveSendButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [onRec, setOnRec] = useState(false);

  const [stream, setStream] = useState(null);
  const [media, setMedia] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [ttsUrls, setTtsUrls] = useState([]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setActiveMicButton(true);
    setActiveStopButton(false);
    setActiveSendButton(false);
  }, []);

  useEffect(() => {
    setActiveMicButton(true);
    setActiveStopButton(false);
    setActiveSendButton(false);

    const fetchSubQuestion = async () => {
      try {
        const response = await getSubQuestion({ topic, id });
        if (response && response.status === 200) {
          const subQuestionList = response.data.map((element) => element.question);
          const questionList = [question, ...subQuestionList];
          setActiveMicButton(true);
          setQuestions(questionList);
        }
      } catch (error) {
        console.error('Error fetching sub-questions:', error);
      }
    };
    fetchSubQuestion();
  }, [topic, id, question]);

  useEffect(() => {
    if (currentQuestionIndex !== Questions.length) {
      setActiveSendButton(answerInput.trim() !== '');
    } else {
      setActiveMicButton(false);
      setActiveStopButton(false);
      setActiveSendButton(false);
    }
  }, [answerInput, currentQuestionIndex, Questions.length]);

  useEffect(() => {
    fetchAndPlayTTS(currentQuestionIndex);
  }, [currentQuestionIndex, Questions]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestionIndex, ref]);

  const startRecording = async () => {
    setOnRec(true);
    setActiveMicButton(false);
    setActiveStopButton(true);
    setActiveSendButton(false);

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
        latencyHint: 'interactive',
      });

      if (!audioCtx.audioWorklet) {
        console.error('AudioWorklet is not supported in this browser');
        return;
      }

      await audioCtx.audioWorklet.addModule(process.env.PUBLIC_URL + '/analyser-processor.js');
      const analyserNode = new AudioWorkletNode(audioCtx, 'analyser-processor');
      analyserNode.smoothingTimeConstant = 0.3;

      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
      compressor.knee.setValueAtTime(40, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);

      const sourceNode = audioCtx.createMediaStreamSource(stream);
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

      sourceNode.connect(compressor);
      compressor.connect(filter);
      filter.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);

      mediaRecorder.start();

      analyserNode.port.onmessage = (event) => {
        if (event.data === 'check') {
          setOnRec(true);
        }
      };
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setActiveMicButton(true);
      setActiveStopButton(false);
      setActiveSendButton(false);
    }
  };

  const stopRecording = async () => {
    if (!media || !stream) return;

    media.ondataavailable = function (e) {
      const audioData = e.data;
      setAudioUrl(URL.createObjectURL(audioData));
    };

    media.stop();
    stream.getAudioTracks().forEach((track) => track.stop());

    setActiveMicButton(false);
    setActiveStopButton(false);
    setActiveSendButton(true);
  };

  const handleAudioFeedback = async () => {
    console.log('getAudioFeedback call');
    if (audioUrl) {
      try {
        setIsLoading(true);
        setActiveMicButton(false);
        setActiveStopButton(false);
        setActiveSendButton(false);
        const response = await fetch(audioUrl);
        const blob = await response.blob();

        const wavBlob = await convertBlobToWav(blob);
        const sound = new File([wavBlob], 'soundBlob.wav', {
          lastModified: new Date().getTime(),
          type: 'audio/wav',
        });
        const formData = new FormData();
        formData.append('audio', sound);
        const audioResponse = await getAudioFeedback(formData);
        if (audioResponse && audioResponse.status === 200) {
          const data = await audioResponse.data;
          const answerText = data.text;
          const answerScore = data.score;
          console.log(data);

          console.log('getFeedback call');

          let questionClass = 'sub';
          if (currentQuestionIndex === 0) {
            questionClass = 'main';
          }
          const currentQuestion = Questions[currentQuestionIndex];

          try {
            setIsLoading(true);
            const response = await getFeedback({
              topic,
              currentQuestion,
              answerInput: answerText,
              questionClass,
            });
            if (response && response.status === 200) {
              console.log(response.data);
              setFeedbacks([...feedbacks, { feedback: response.data, score: answerScore }]);
              setAnswers([...answers, answerText]);
              setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                fetchAndPlayTTS(newIndex);
                return newIndex;
              });
              setActiveMicButton(true);
              setActiveStopButton(false);
            } else {
              alert('error');
            }
          } catch (error) {
            console.error('Error fetching feedback:', error);
          } finally {
            setIsLoading(false);
          }
          setAnswerInput('');
        } else {
          console.log('Error:', audioResponse.status);
        }
      } catch (error) {
        console.error('Error submitting audio file:', error);
      } finally {
        setIsLoading(false);
      }
      setOnRec(false);
    }
  };

  const handleFeedback = async () => {
    console.log('getFeedback call');

    let questionClass = 'sub';
    if (currentQuestionIndex === 0) {
      questionClass = 'main';
    }
    const currentQuestion = Questions[currentQuestionIndex];

    try {
      setIsLoading(true);
      console.log(answerInput);
      const response = await getFeedback({
        topic,
        currentQuestion,
        answerInput,
        questionClass,
      });
      if (response && response.status === 200) {
        console.log(response.data);
        setFeedbacks([...feedbacks, { feedback: response.data, score: '' }]);
        setAnswers([...answers, answerInput]);
        setCurrentQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          fetchAndPlayTTS(newIndex);
          return newIndex;
        });
        setActiveMicButton(true);
        setActiveStopButton(false);
      } else {
        alert('error');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
    setAnswerInput('');
  };

  const convertBlobToWav = async (blob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 16000,
    });
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numberOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * numberOfChannels * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, 16000, true); // sampleRate = 16000
    view.setUint32(28, 16000 * 2 * numberOfChannels, true); // byteRate = sampleRate * blockAlign
    view.setUint16(32, numberOfChannels * 2, true); // blockAlign = numberOfChannels * bytesPerSample
    view.setUint16(34, 16, true); // bitsPerSample
    writeString(view, 36, 'data');
    view.setUint32(40, audioBuffer.length * numberOfChannels * 2, true);
    // Write PCM samples
    const offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = audioBuffer.getChannelData(channel)[i];
        const intSample = sample < 0 ? sample * 32768 : sample * 32767; // Convert sample to 16-bit PCM
        view.setInt16(offset + (i * numberOfChannels + channel) * 2, intSample, true);
      }
    }
    return new Blob([buffer], { type: 'audio/wav' });
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const fetchAndPlayTTS = async (index) => {
    if (Questions.length > 0 && index < Questions.length) {
      const text = Questions[index];
      try {
        const { status, data } = await getTTS({ text });
        if (status === 200) {
          const url = URL.createObjectURL(data);
          setTtsUrls((prevUrls) => {
            const newUrls = [...prevUrls];
            newUrls[index] = url;
            return newUrls;
          });
        } else {
          console.error('Failed to fetch TTS audio:', status);
        }
      } catch (error) {
        console.error('Error fetching TTS:', error);
      }
    }
  };

  return (
    <div className="practice-container">
      <div className="practice-navbar">
        <img
          src={process.env.PUBLIC_URL + '/img/arrow.png'}
          alt="arrow"
          onClick={() => navigate(-1)}
        />
        <h4>주제: {topic}</h4>
      </div>

      <div className="practice-chat">
        {Questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <React.Fragment key={index}>
            <AIChat question={question} ttsUrl={ttsUrls[index]} />
            {index < answers.length && (
              <div className="practice-chat-answer">
                <UserChat index={index} answers={answers} />
                <AIFeedback index={index} feedbacks={feedbacks} />
                {feedbacks[index].score !== '' && <ScoreBox index={index} feedbacks={feedbacks} />}
              </div>
            )}
          </React.Fragment>
        ))}
        {currentQuestionIndex === Questions.length && (
          <div className="practice-finish">
            <div className="practice-finish-top">
              <HiOutlineLightBulb size={40} color="#FF2E00" />
              <p>학습 완료!</p>
            </div>
            <div className="practice-finish-middle">
              <p>준비한 질문은 여기까지에요.</p>
              <p style={{ color: '#FF2E00' }}>위에서 한 대화 내용을 한 번 더 검토해 봅시다!</p>
            </div>
            <div className="practice-finish-bottom">
              <p>그리고</p>
              <p>
                <span style={{ color: '#FF2E00' }}>마이페이지</span>에서 저장된 피드백들을
              </p>
              <p>반복적으로 학습해보아요!</p>

              <div className="practice-finish-bottom-link">
                <h4 onClick={() => navigate('/mypage/chat-review')}>피드백 보기</h4>
                <h4 onClick={() => navigate(-1)}>나가기</h4>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="loading-box">
            <p>"답변을 분석하고 있습니다!"</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        <div style={{ width: '100%:', height: '100px' }}></div>
        <div ref={ref} />
      </div>

      <div className="practice-input">
        <input
          value={answerInput}
          onChange={(event) => setAnswerInput(event.target.value)}
          onKeyUp={(event) => {
            if (answerInput.trim() !== '') {
              if (event.key === 'Enter') {
                handleFeedback();
              }
            }
          }}
        />
        <div className="practice-input-send">
          <button onClick={activeMicButton ? startRecording : undefined}>
            <img
              style={activeMicButton ? { opacity: '1' } : { opacity: '0.3' }}
              src={process.env.PUBLIC_URL + '/img/mic.png'}
              alt="mic"
            />
          </button>
          <button onClick={activeStopButton ? stopRecording : undefined}>
            <img
              style={activeStopButton ? { opacity: '1' } : { opacity: '0.3' }}
              src={process.env.PUBLIC_URL + '/img/stop.png'}
              alt="stop"
            />
          </button>
          <button
            onClick={activeSendButton ? (onRec ? handleAudioFeedback : handleFeedback) : undefined}
          >
            <img
              style={{ opacity: activeSendButton ? '1' : '0.3' }}
              src={process.env.PUBLIC_URL + '/img/send.png'}
              alt="send"
            />
          </button>
        </div>
      </div>

      {audioUrl && (
        <div className="practice-audio">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
});

export function AIChat({ question, ttsUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="ai-chat">
      <div className="ai-chat-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
        <p />
      </div>
      <div className="ai-chat-dialogue">
        <h4>{question}</h4>
        {ttsUrl && (
          <>
            <HiSpeakerWave className="custom-audio-player" onClick={handlePlayPause} />
            <audio ref={audioRef} src={ttsUrl} />
          </>
        )}
      </div>
    </div>
  );
}

export function UserChat({ index, answers }) {
  return (
    <div className="answer-box">{answers && answers.length > 0 && <p>{answers[index]}</p>}</div>
  );
}

export function AIFeedback({ index, feedbacks }) {
  return (
    <div className="feedback-box">
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
      {feedbacks && feedbacks.length > 0 && <p>{feedbacks[index].feedback}</p>}
    </div>
  );
}

export function ScoreBox({ index, feedbacks }) {
  return (
    <div className="score-box">
      {feedbacks && feedbacks.length > 0 && <p>{feedbacks[index].score}</p>}
    </div>
  );
}

export default function ChatPractice() {
  const messageEndRef = useRef(null);

  return <ChatPracticeContent ref={messageEndRef} />;
}
