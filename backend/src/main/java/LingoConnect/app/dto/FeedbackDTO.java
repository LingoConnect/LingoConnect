package LingoConnect.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedbackDTO {
    private Long id;
    private Long userId; // User 객체 대신 ID만 사용
    private String topic;
    private String question;
    private String userAnswer;
    private String feedback;

    @Builder
    public FeedbackDTO(Long id, Long userId, String topic, String question, String userAnswer, String feedback) {
        this.id = id;
        this.userId = userId;
        this.topic = topic;
        this.question = question;
        this.userAnswer = userAnswer;
        this.feedback = feedback;
    }
}
