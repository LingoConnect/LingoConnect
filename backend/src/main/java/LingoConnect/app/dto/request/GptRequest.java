package LingoConnect.app.dto.request;

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
            example = "자기 관리")
    private String title;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "question",
            description = "question",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "스트레스를 받았을 때 어떻게 하면 좋을까?")
    private String question;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "userAnswer",
            description = "userAnswer",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "운동을 하면서 풀면 좋을 것 같아.")
    private String userAnswer;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "questionClass",
            description = "main or sub question",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "main")
    private String questionClass;
}
