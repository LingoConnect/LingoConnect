package LingoConnect.app.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request object to chat with GPT")
public class GptRequest {
    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "title",
            description = "title",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "주제: 일상 대화 연습\n")
    private String title;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "question",
            description = "question",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "친구: 학교에서 가장 좋아하는 활동이 뭐야?\n")
    private String question;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "userAnswer",
            description = "userAnswer",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "지적장애인: 나는 미술 수업을 정말 좋아해!")
    private String userAnswer;
}
