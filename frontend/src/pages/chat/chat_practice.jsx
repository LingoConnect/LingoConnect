import React, { useState, useEffect, useContext, useCallback, useRef, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { getFeedback, getAudioFeedback } from '../../api/ai_api';
import { getSubQuestion } from '../../api/learning_content_api';
import { sendFeedbackMail } from '../../api/mail_api';
import { getTTS } from '../../api/tts_api';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { HiSpeakerWave } from 'react-icons/hi2';
import { GlobalContext } from '../../App';

const ChatPracticeContent = forwardRef((_, ref) => {
  const { globalScores, setGlobalScores } = useContext(GlobalContext);

  const location = useLocation();
  const { topic, question, id } = location.state || {};
  const navigate = useNavigate();
  const [answerInput, setAnswerInput] = useState('');
  const [mail, setMail] = useState('');

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

  const [questionTTSurls, setQuestionTTSurls] = useState([]);
  const [feedbackTTSurls, setFeedbackTTSurls] = useState('');

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

  const fetchQuestionTTS = useCallback(
    async (index) => {
      if (Questions.length > 0 && index < Questions.length) {
        const text = Questions[index];
        try {
          const { status, data } = await getTTS({ text });
          if (status === 200) {
            const url = URL.createObjectURL(data);
            setQuestionTTSurls((prevUrls) => {
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
    },
    [Questions]
  );

  const fetchFeedbackTTS = async (text) => {
    const { status, data } = await getTTS({ text });
    if (status === 200) {
      const url = URL.createObjectURL(data);
      setFeedbackTTSurls(url);
    } else {
      console.error('Failed to fetch TTS audio:', status);
    }
  };

  const feedbackMail = async () => {
    let mail_content = '';

    Questions.forEach((element, index) => {
      mail_content += `질문: ${element}\n학습자의 답변: ${answers[index]}\n피드백: ${feedbacks[index].feedback}\n\n`;
    });

    const { status } = await sendFeedbackMail({
      receiver: mail,
      title: '[링고커넥트] 학습 내용을 공유해드립니다!',
      content: mail_content,
    });

    if (status === 200) {
      alert('메일이 발송되었습니다.');
    } else {
      console.log('failed to send mail', status);
    }
  };

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
    fetchQuestionTTS(currentQuestionIndex);
  }, [currentQuestionIndex, fetchQuestionTTS]);

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
        sampleRate: 48000,
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
          sampleRate: 48000,
          channelCount: 2,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);

      const sourceNode = audioCtx.createMediaStreamSource(stream);

      // Highpass filter
      const highpassFilter = audioCtx.createBiquadFilter();
      highpassFilter.type = 'highpass';
      highpassFilter.frequency.setValueAtTime(100, audioCtx.currentTime);

      // Lowpass filter
      const lowpassFilter = audioCtx.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

      // Bandpass filter
      const bandpassFilter = audioCtx.createBiquadFilter();
      bandpassFilter.type = 'bandpass';
      bandpassFilter.frequency.setValueAtTime(355, audioCtx.currentTime);
      bandpassFilter.Q.setValueAtTime(8.3, audioCtx.currentTime);

      // Notch filter (removes a specific frequency)
      const notchFilter = audioCtx.createBiquadFilter();
      notchFilter.type = 'notch';
      notchFilter.frequency.setValueAtTime(60, audioCtx.currentTime); // Assuming 60Hz power line noise
      notchFilter.Q.setValueAtTime(10, audioCtx.currentTime);

      sourceNode.connect(compressor);
      compressor.connect(highpassFilter);
      highpassFilter.connect(lowpassFilter);
      lowpassFilter.connect(bandpassFilter);
      bandpassFilter.connect(notchFilter);
      notchFilter.connect(analyserNode);

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
              const newFeedback = { feedback: response.data, score: answerScore };
              setGlobalScores([...globalScores, answerScore]); //전역 변수에 발음 점수 추가
              setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
              setAnswers((prevAnswers) => [...prevAnswers, answerText]);
              setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                fetchQuestionTTS(newIndex);
                return newIndex;
              });

              const text = response.data;
              fetchFeedbackTTS(text);

              setActiveMicButton(true);
              setActiveStopButton(false);
            } else {
              console.error('Failed to get feedback:', response.status);
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
        const newFeedback = { feedback: response.data, score: '' };
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
        setAnswers((prevAnswers) => [...prevAnswers, answerInput]);
        setCurrentQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          fetchQuestionTTS(newIndex);
          return newIndex;
        });

        const text = response.data;
        fetchFeedbackTTS(text);

        setActiveMicButton(true);
        setActiveStopButton(false);
      } else {
        console.error('Failed to get feedback:', response.status);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
    setAnswerInput('');
  };

  const convertBlobToWav = async (blob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate; // Use the sample rate from the audio buffer
    const length = audioBuffer.length * numberOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    // Write WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * numberOfChannels * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numberOfChannels, true); // Number of Channels
    view.setUint32(24, sampleRate, true); // Sample Rate
    view.setUint32(28, sampleRate * numberOfChannels * 2, true); // Byte Rate
    view.setUint16(32, numberOfChannels * 2, true); // Block Align
    view.setUint16(34, 16, true); // Bits Per Sample
    writeString(view, 36, 'data');
    view.setUint32(40, audioBuffer.length * numberOfChannels * 2, true);

    // Write PCM samples
    const offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = audioBuffer.getChannelData(channel)[i];
        const intSample = Math.max(-1, Math.min(1, sample)) * 32767; // Convert sample to 16-bit PCM
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
            <AIChat question={question} ttsUrl={questionTTSurls[index]} />
            {index < answers.length && (
              <div className="practice-chat-answer">
                <UserChat index={index} answers={answers} />
                <AIFeedback index={index} feedbacks={feedbacks} ttsUrl={feedbackTTSurls} />
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
            <div className="practice-finish-email">
              <p>
                <span>보호자</span>님께
              </p>
              <p>학습한 결과를 전송할 수 있어요!</p>
              <p>
                <span>보호자</span>분의 <span>메일주소</span>를 써주시면 보내드릴게요!
              </p>
              <div className="practice-finish-email-input">
                <input
                  placeholder="| 메일 주소 쓰기 (ex. lingo@gmail.com)"
                  onChange={(e) => setMail(e.target.value)}
                ></input>
                <button onClick={() => feedbackMail()}>전송</button>
              </div>
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
        <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
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
            <HiSpeakerWave className="aichat-audio-player" onClick={handlePlayPause} />
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

export function AIFeedback({ index, feedbacks, ttsUrl }) {
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
    <div className="feedback-box">
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
      {feedbacks && feedbacks.length > 0 && <p>{feedbacks[index].feedback}</p>}
      {feedbacks.length === index + 1 && ttsUrl && (
        <>
          <HiSpeakerWave className="aifeedback-audio-player" onClick={handlePlayPause} />
          <audio ref={audioRef} src={ttsUrl} />
        </>
      )}
    </div>
  );
}

export function ScoreBox({ index, feedbacks }) {
  return (
    <div className="score-box">
      {feedbacks && feedbacks.length > 0 && <p>발음평가 점수: {feedbacks[index].score} / 5</p>}
    </div>
  );
}

export default function ChatPractice() {
  const messageEndRef = useRef(null);

  return <ChatPracticeContent ref={messageEndRef} />;
}
