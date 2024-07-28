package LingoConnect.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TopQuestionDTO {
    private Long id;
    private String topic;
    private String question;
    private String difficulty;

    @Builder
    public TopQuestionDTO(Long id, String topic, String question, String difficulty) {
        this.id = id;
        this.topic = topic;
        this.question = question;
        this.difficulty = difficulty;
    }
}
