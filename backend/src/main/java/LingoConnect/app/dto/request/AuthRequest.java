package LingoConnect.app.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request object to register")
public class AuthRequest {
    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "username",
            description = "username",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "퀴푸")
    private String username;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "email",
            description = "email",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "mail@example.com")
    private String email;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "password",
            description = "password",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "password")
    private String password;

    @NotBlank(message = "{not_blank}")
    @Schema(
            name = "role",
            description = "guardian or member",
            type = "String",
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "guardian")
    private String role;
}
