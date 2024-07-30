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
            example = "운동")
    private String title;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "question",
            description = "question",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?")
    private String question;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "userAnswer",
            description = "userAnswer",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "친구랑 같이 운동하면 더 힘이 나!")
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
