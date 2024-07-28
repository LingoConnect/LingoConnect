package LingoConnect.app.service;

import LingoConnect.app.dto.FeedbackDTO;
import LingoConnect.app.entity.Feedback;
import LingoConnect.app.entity.User;
import LingoConnect.app.repository.FeedbackRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Transactional
    public Long createFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = toEntity(feedbackDTO);
        feedbackRepository.save(feedback);
        return feedback.getId();
    }

    // User 클래스 작업 후 수정 필요
    private static Feedback toEntity(FeedbackDTO feedbackDTO) {
        Feedback feedback = Feedback.builder()
                //.user(User)  // <------------------------- 수정 필요 + User nullable false로 수정
                .topic(feedbackDTO.getTopic())
                .question(feedbackDTO.getQuestion())
                .userAnswer(feedbackDTO.getUserAnswer())
                .feedback(feedbackDTO.getFeedback())
                .build();
        return feedback;
    }

    private static FeedbackDTO toDto(Feedback feedback) {
        FeedbackDTO feedbackDTO = FeedbackDTO.builder()
                //.user(User)  // <------------------------- 수정 필요 + User nullable false로 수정
                .topic(feedback.getTopic())
                .question(feedback.getQuestion())
                .userAnswer(feedback.getUserAnswer())
                .feedback(feedback.getFeedback())
                .build();
        return feedbackDTO;
    }

    @Transactional
    public FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found")); // 예외 처리

        Feedback updated = Feedback.builder()
                .id(feedback.getId())
                .question(feedback.getQuestion())
                .feedback(feedbackDTO.getFeedback())
                .topic(feedback.getTopic())
                .userAnswer(feedbackDTO.getUserAnswer())
                //.user(feedbackDTO.getUserId()) // <--------------- 수정 필요
                .build();

        // User 업데이트가 필요하면 추가 로직 구현
        feedback = feedbackRepository.save(updated);

        return toDto(feedback);
    }

    @Transactional
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

}