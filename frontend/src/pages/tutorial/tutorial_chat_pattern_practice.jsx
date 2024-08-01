import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat_pattern_practice.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { TextWithLineBreaks } from '../mypage/chat/chat_pattern_practice';

export default function TutorialPatternPractice() {
  const navigate = useNavigate();
  // const pattern =
  //   '질문에 대해 단답형으로 대답하는 경향이 있습니다. 대답을 할 때 두세 문장 이상으로 대답해보는 연습을 해보아요!';
  const [index, setIndex] = useState(0);
  const patternTutorial = [
    '이 페이지에서는 주제별로 피드백들을 분석해서 자주하는 실수를 보여줘요.',
    '마찬가지로 마이페이지의 실수 분석 메뉴에서 볼 수 있답니다.',
    '앱 사용법 설명은 여기서 마칠게요!',
    '메인 화면에서 언제든지 다시 설명을 볼 수 있어요.',
    '그럼 이제 메인 화면으로 돌아가서 즐거운 학습을 시작해봅시다!',
  ];


  return (
    <div className="PatternResult-container">
      <div className="mypage-back">
        <FaArrowLeftLong size={30} color="#746745" />
      </div>

      <div className="PatternResult-main">
        <h4>자주 하는 실수(패턴) 분석</h4>
        <p className={index < 2 ? 'tutorial-main' : ''}>학교</p>
      </div>

      <div className="PatternResult-card" style={{ marginTop: '8vh' }}>
        <ResultCard index={index} />
      </div>

      <div className="PatternResult-img">
        <img
          src={process.env.PUBLIC_URL + '/img/mummy.png'}
          alt=""
          onClick={() => navigate('/tutorial/mypage/chat-review')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <Modal index={index} setIndex={setIndex} patternTutorial={patternTutorial} />
    </div>
  );
}

function ResultCard({ index }) {
  const pattern = '당신은 보이스피싱 및 사기 예방에 대해 배우는 과정에서 좋은 방향으로 나아가고 계세요. 몇 가지 주의할 점을 더 명확하게 설명해드릴게요. 1. **명확성과 구체성 부족**: - **패턴 분석**: 답변이 매우 간략하거나 불명확합니다. 예를 들어, "ㅁㄴㅇㄹㅁㄴㅇㄹ"와 같은 반응은 이해하기 어렵습니다. - **개선 방안**: 명확하고 구체적인 예시를 제공하세요. 예를 들어, "먼저 전화를 끊고, 가족이나 친구에게 알린다"처럼 구체적인 행동을 설명하세요. 2. **긴급 상황 대응**: - **패턴 분석**: "끊어버려"와 같은 답변은 상황에 적절한 반응이지만, 그 이후의 대처 방법을 설명하지 않아 추가적인 조치가 필요할 수 있습니다. - **개선 방안**: 전화를 끊은 후에도 해야 할 일을 설명합니다. 예를 들어, "전화를 끊은 다음, 가족이나 경찰에 신고해요"와 같은 후속 조치를 포함하세요. 3. **상황 대응 훈련**: - **패턴 분석**: "그 사람과 나만이 아는 신호를 주고받을거야"는 좋은 반응이지만, 실제 상황에서는 피싱일 가능성이 높다는 사실을 명심해야 합니다. - **개선 방안**: "비밀 신호를 사용하다가도, 의심스러우면 공적인 기관에 직접 확인해보는 것이 좋아요. 그리고 개인 정보를 공유하지 말아야 해요"처럼 구체적인 방안을 추가하세요. ### 요약 - **명확하고 구체적인 표현 사용**: 예를 들어, "모르는 사람이 돈을 요구하면 먼저 전화를 끊고, 가족이나 경찰에 알린다"는 식으로 답변을 구체화하세요. - **후속 조치 포함**: 전화를 끊는 등의 행동 후에 해야 할 일을 설명하세요. - **비밀 신호 외에도 다른 방법 활용**: 실제로 안전하게 신원을 확인하는 다른 방법들도 사용해야 합니다. 이렇게 하면, 보다 명확하고 효율적으로 보이스피싱과 사기 전화를 예방할 수 있을 것입니다.';

  return (
    <div className="resultcard-container">
      <div className={index < 2 ? 'resultcard-card tutorial-main' : 'resultcard-card'}>
        <img src={process.env.PUBLIC_URL + '/img/light.png'} alt="" />
        <h4><TextWithLineBreaks pattern={pattern} /></h4>
      </div>
    </div>
  );
}

function Modal({ index, setIndex, patternTutorial }) {
  const navigate = useNavigate();

  return (
    <div className="tutorialModal pattern-modal" style={{ bottom: '20px' }}>
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="튜토리얼" />
      <h4>{patternTutorial[index]}</h4>
      {index < 4 && <p onClick={() => setIndex(index + 1)}>다음 &gt;</p>}
      {index === 4 && (
        <p onClick={() => navigate('/study/chat')} style={{ color: 'rgb(0,10,255)' }}>
          메인으로
        </p>
      )}
    </div>
  );
}
