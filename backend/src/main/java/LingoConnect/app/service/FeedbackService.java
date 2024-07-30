package LingoConnect.app.service;

import LingoConnect.app.dto.FeedbackDTO;
import LingoConnect.app.dto.TopQuestionDTO;
import LingoConnect.app.entity.Feedback;
import LingoConnect.app.entity.TopQuestion;
import LingoConnect.app.entity.User;
import LingoConnect.app.repository.FeedbackRepository;
import LingoConnect.app.repository.TopQuestionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final TopQuestionRepository topQuestionRepository;

    @Transactional
    public Long createFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = toEntity(feedbackDTO);
        feedbackRepository.save(feedback);
        return feedback.getId();
    }

    // User 클래스 작업 후 수정 필요
    private Feedback toEntity(FeedbackDTO feedbackDTO) {
        Long topQuestionId = feedbackDTO.getTopQuestionId();

        TopQuestion topQuestion = topQuestionRepository.findById(topQuestionId)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + topQuestionId));

        Feedback feedback = Feedback.builder()
                //.user(User)  // <------------------------- 수정 필요 + User nullable false로 수정
                .topic(feedbackDTO.getTopic())
                .topQuestion(topQuestion)
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
                .topQuestionId(feedback.getTopQuestion().getId())
                .id(feedback.getId())
                .build();
        return feedbackDTO;
    }

    @Transactional
    public FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found")); // 예외 처리

        Long topQuestionId = feedbackDTO.getTopQuestionId();

        TopQuestion topQuestion = topQuestionRepository.findById(topQuestionId)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + topQuestionId));

        Feedback updated = Feedback.builder()
                .id(feedback.getId())
                .question(feedback.getQuestion())
                .feedback(feedbackDTO.getFeedback())
                .topic(feedback.getTopic())
                .userAnswer(feedbackDTO.getUserAnswer())
                .topQuestion(topQuestion)
                //.user(feedbackDTO.getUserId()) // <--------------- 수정 필요
                .build();

        // User 업데이트가 필요하면 추가 로직 구현
        feedback = feedbackRepository.save(updated);

        return toDto(feedback);
    }

    public FeedbackDTO findById(Long id){
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No feedback found with id: " + id));

        return toDto(feedback);
    }

    public ArrayList<FeedbackDTO> findByTopQuestionId(Long id){
        TopQuestion topQuestion = topQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + id));

        List<Feedback> feedbacks = feedbackRepository.findByTopQuestion(topQuestion);
        ArrayList<FeedbackDTO> dtos = new ArrayList<>();

        for(Feedback feedback : feedbacks){
            dtos.add(toDto(feedback));
        }

        return dtos;
    }

    @Transactional
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    public ArrayList<FeedbackDTO> findAll() {
        List<Feedback> all = feedbackRepository.findAll();
        ArrayList<FeedbackDTO> dtos = new ArrayList<>();

        for(Feedback feedback : all){
            dtos.add(toDto(feedback));
        }

        return dtos;
    }
}