package LingoConnect.app.controller;

import LingoConnect.app.dto.FeedbackDTO;
import LingoConnect.app.request.GptRequest;
import LingoConnect.app.response.SuccessResponse;
import LingoConnect.app.service.FeedbackService;
import LingoConnect.app.service.GptService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequestMapping("/openai")
@RequiredArgsConstructor
public class GptController {

    private final GptService gptService;
    private final FeedbackService feedbackService;

    private int flag = 0;

    private int count = 0;
    @GetMapping("/")
    @Transactional
    @Operation(
            summary = "get Ai Response from Backend Server",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful operation",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = SuccessResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad request",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Bad credentials",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    public ResponseEntity<?> getAiResponse(@ModelAttribute GptRequest gptRequest) throws InterruptedException {
        count++;
        if(count>5){
            return ResponseEntity.ok().body("과금 방지 제한");
        }

        String topic = gptRequest.getTitle();
        String question = gptRequest.getQuestion();
        String userAnswer = gptRequest.getUserAnswer();

        String content = topic + question + userAnswer;

        String assistantId = null;
        if(gptService.checkAssistant("lingoConnect")){
            // 이미 lingoConnect Ai가 존재하는 경우
            assistantId = "asst_72rWdwPlhnx8wsH6kSZ2Nypk";
        } else {
            // lingoConnect Ai를 새로 생성하는 경우
            assistantId = gptService.getAssistantId("gpt-3.5-turbo-0125");
        }

        String gptFeedback = response(content, assistantId);

        // ----------- 피드백 저장 -------------
        FeedbackDTO feedbackDTO = FeedbackDTO.builder()
                .userId(1L) // <------------------ 수정 필요
                .topic(topic)
                .question(question)
                .userAnswer(userAnswer)
                .feedback(gptFeedback)
                .build();

        feedbackService.createFeedback(feedbackDTO);
        return ResponseEntity.ok().body(gptFeedback);
    }

    private String response(String content, String assistantId) throws InterruptedException {
        String threadId = gptService.createThreadAndGetId();
        String messageId = gptService.createMessageAndGetId(threadId, content);
        String runId = gptService.createRun(threadId, assistantId);
        return gptService.getResponse(threadId, runId);
    }
}
