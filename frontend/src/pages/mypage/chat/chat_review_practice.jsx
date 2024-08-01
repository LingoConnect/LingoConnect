import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/chat_review_practice.css';
import { AIChat, UserChat, AIFeedback } from '../../chat/chat_practice';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function ReviewResult() {
  const location = useLocation();
  const navigate = useNavigate();
  // const [index, setIndex] = useState(1);
  const { filteredFeedback, selectedMainQuestion } = location.state || {};
  const topic =
    filteredFeedback && filteredFeedback.length > 0 ? filteredFeedback[0].topic : undefined;

  return (
    <div className="feedbackresult-container">
      <div className="feedbackresult-back" onClick={() => navigate(-1)}>
        <FaArrowLeftLong size={30} color="#746745" />
      </div>
      <div className="feedbackresult-main">
        <h4>피드백 모아보기</h4>
        <p>{topic}</p>
        <h4>Q. {selectedMainQuestion}</h4>
      </div>

      {/* <div className="feedbackresult-index">
        <div className="feedbackresult-index-left">
          {index > 1 && (
            <h4
              onClick={(e) => {
                if (index > 0) {
                  setIndex(index - 1);
                }
                e.stopPropagation();
              }}
            >
              &lt;
            </h4>
          )}
        </div>
        <div className="feedbackresult-index-middle">
          <p
            onClick={() => {
              if (index > 1) {
                setIndex(index - 1);
              }
            }}
          >
            {index}
          </p>
          <p>{index + 1}</p>
          <p onClick={() => setIndex(index + 1)}>{index + 2}</p>
        </div>
        <div className="feedbackresult-index-right">
          {index !== 10 && (
            <h4
              onClick={(e) => {
                if (index < 100) {
                  setIndex(index + 1);
                }
                e.stopPropagation();
              }}
            >
              &gt;
            </h4>
          )}
        </div>
      </div> */}

      <div className="feedbackresult-box">
        {filteredFeedback.map((element) => {
          return (
            <>
              <AIChat question={element.question} ttsUrl={false} />
              <UserChat index={0} answers={[element.userAnswer]} />
              <AIFeedback index={0} feedbacks={[{ feedback: element.feedback }]} ttsUrl={false} />
            </>
          );
        })}
      </div>
    </div>
  );
}
