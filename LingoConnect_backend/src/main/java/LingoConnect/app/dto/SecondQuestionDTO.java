package LingoConnect.app.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SecondQuestionDTO {
    private Long id;
    private String question;
    private Long topQuestionId;
    private String imageName;

    @Builder
    public SecondQuestionDTO(Long id, String question, Long topQuestionId, String imageName) {
        this.id = id;
        this.question = question;
        this.topQuestionId = topQuestionId;
        this.imageName = imageName;
    }
}
