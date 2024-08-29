package LingoConnect.app.controller;

import LingoConnect.app.dto.FeedbackDTO;
import LingoConnect.app.dto.SecondQuestionDTO;
import LingoConnect.app.dto.TopQuestionDTO;
import LingoConnect.app.dto.request.GptRequest;
import LingoConnect.app.dto.response.SuccessResponse;
import LingoConnect.app.service.FeedbackService;
import LingoConnect.app.service.GptService;
import LingoConnect.app.service.SecondQuestionService;
import LingoConnect.app.service.TopQuestionService;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Random;


@RestController
@Slf4j
@RequestMapping("/openai")
@RequiredArgsConstructor
public class GptController {

    private final GptService gptService;
    private final FeedbackService feedbackService;
    private final TopQuestionService topQuestionService;
    private final SecondQuestionService secondQuestionService;

    @PostMapping("/image")
    @Operation(
            summary = "get image through prompt",
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
    public ResponseEntity<String> makeImage(@RequestParam(name = "prompt") String prompt){
        log.info(":{}",gptService);
        String url = gptService.createImage(prompt);
        return ResponseEntity.ok().body(url);
    }

    @GetMapping("/images")
    @Operation(
            summary = "get images list",
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
    public ResponseEntity<ArrayList<ArrayList<String>>> imageList() {
        ArrayList<ArrayList<String>> imageList = new ArrayList<>();

        ArrayList<String> item1 = new ArrayList<>();
        item1.add("교통");
        item1.add("http://localhost:8080/img/교통.png");
        imageList.add(item1);

        ArrayList<String> item2 = new ArrayList<>();
        item2.add("동물");
        item2.add("http://localhost:8080/img/동물.png");
        imageList.add(item2);

        ArrayList<String> item3 = new ArrayList<>();
        item3.add("음식");
        item3.add("http://localhost:8080/img/음식.png");
        imageList.add(item3);

        ArrayList<String> item4 = new ArrayList<>();
        item4.add("코딩");
        item4.add("http://localhost:8080/img/코딩.png");
        imageList.add(item4);

        ArrayList<String> item5 = new ArrayList<>();
        item5.add("학교");
        item5.add("http://localhost:8080/img/학교.png");
        imageList.add(item5);

        return ResponseEntity.ok().body(imageList);
    }
    @GetMapping("/image/random")
    @Operation(
            summary = "get random image about topic",
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
    public ResponseEntity<String> image(@RequestParam String topic) {
        Random random = new Random();
        int randomInt = random.nextInt(3) + 1;

        String imageSource = topic + randomInt + ".webp";
        String imagePath = "http://localhost:8080/img/" + imageSource;
        return ResponseEntity.ok().body(imagePath);
    }

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
//        count++;
        Long topQuestionId = null;
//        if(count>5){
//            return ResponseEntity.ok().body("과금 방지 제한");
//        }

        String topic = "주제: " + gptRequest.getTitle() + "\n ";
        String question = gptRequest.getQuestion();
        String userAnswer = "지적장애인: " + gptRequest.getUserAnswer() + "\n";
        String questionClass = gptRequest.getQuestionClass();

        if(questionClass.equals("main")) {
            TopQuestionDTO byQuestion = topQuestionService.findByQuestion(question);
            topQuestionId = byQuestion.getId();
        } else {
            SecondQuestionDTO byQuestion = secondQuestionService.findByQuestion(question);
            topQuestionId = byQuestion.getTopQuestionId();
        }

        question = "질문: " + question + "\n ";

        String content = topic + question + userAnswer;

        JsonArray jsonArray = gptService.listAssistants();
        String assistantId = null;

        for (JsonElement element : jsonArray) {
            JsonObject assistant = element.getAsJsonObject();
            if (assistant.has("name") && "lingoConnect".equals(assistant.get("name").getAsString())) {
                log.info("already exist: {}", assistant.get("name").getAsString());
                assistantId = assistant.get("id").getAsString();
                log.info("assistantId: {}", assistantId);
                break;
            }
        }

        if (assistantId == null) {
            log.info("new");
            assistantId = gptService.getAssistantId("gpt-4o", "lingoConnect");
        }

        String gptFeedback = response(content, assistantId);

        // ----------- 피드백 저장 -------------
        FeedbackDTO feedbackDTO = FeedbackDTO.builder()
                .userId(1L) // <------------------ 수정 필요
                .topic(gptRequest.getTitle())
                .question(gptRequest.getQuestion())
                .userAnswer(gptRequest.getUserAnswer())
                .topQuestionId(topQuestionId)
                .feedback(gptFeedback)
                .build();

        feedbackService.createFeedback(feedbackDTO);
        return ResponseEntity.ok().body(gptFeedback);
    }

    @GetMapping("/image/analysis")
    @Transactional
    @Operation(
            summary = "사용자의 서술 내용이 올바른지 확인",
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
    public ResponseEntity<?> getImageAnalysis(@RequestParam(name = "prompt") String prompt,@RequestParam(name = "imageUrl") String imageUrl) throws InterruptedException {
        JsonArray jsonArray = gptService.listAssistants();
        String assistantId = null;

        for (JsonElement element : jsonArray) {
            JsonObject assistant = element.getAsJsonObject();
            if (assistant.has("name") && "image".equals(assistant.get("name").getAsString())) {
                log.info("already exist: {}", assistant.get("name").getAsString());
                assistantId = assistant.get("id").getAsString();
                log.info("assistantId: {}", assistantId);
                break;
            }
        }
        if (assistantId == null) {
            log.info("new");
            assistantId = gptService.getAssistantId("gpt-4o", "image");
        }

        String content = "이미지: " + imageUrl + ", 사용자의 서술 내용: " + prompt;
        String result = response(content, assistantId);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/analysis")
    @Transactional
    @Operation(
            summary = "GPT에게 패턴 분석 요청",
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
    public ResponseEntity<?> getAiFeedback() throws InterruptedException {
        // ToDo 일단 파라미터 없이 구성, 나중에 user 생기면 userId를 파라미터로 받아야함

//        count++;
        Long topQuestionId = null;

//        if(count>5){
//            return ResponseEntity.ok().body("과금 방지 제한");
//        }

        ArrayList<FeedbackDTO> all = feedbackService.findAll();

        ArrayList<String> request = new ArrayList<>();
        for(FeedbackDTO feedbackDTO : all){
            String topic = feedbackDTO.getTopic();
            String question = feedbackDTO.getQuestion();
            String userAnswer = feedbackDTO.getUserAnswer();
            String feedback = "피드백: " + feedbackDTO.getFeedback();

            String content = "[ 주제: " + topic + " 질문: " + question + " 지적장애인: " + userAnswer + " 피드백: "+ feedback + "]";
            request.add(content);
        }

        JsonArray jsonArray = gptService.listAssistants();
        String assistantId = null;

        for (JsonElement element : jsonArray) {
            JsonObject assistant = element.getAsJsonObject();
            if (assistant.has("name") && "analysis".equals(assistant.get("name").getAsString())) {
                log.info("already exist: {}", assistant.get("name").getAsString());
                assistantId = assistant.get("id").getAsString();
                log.info("assistantId: {}", assistantId);
                break;
            }
        }

        if (assistantId == null) {
            log.info("new");
            assistantId = gptService.getAssistantId("gpt-4o", "analysis");
        }

        return ResponseEntity.ok().body(response(request, assistantId));
    }

    private String response(String content, String assistantId) throws InterruptedException {
        log.info("response 호출");
        String threadId = gptService.createThreadAndGetId();
        String messageId = gptService.createMessageAndGetId(threadId, content);
        String runId = gptService.createRun(threadId, assistantId);
        return gptService.getResponse(threadId, runId);
    }

    private String response(ArrayList<String> content, String assistantId) throws InterruptedException {
        log.info("content: {}", String.valueOf(content));

        String threadId = gptService.createThreadAndGetId();
        String messageId = gptService.createMessageAndGetId(threadId, String.valueOf(content));
        String runId = gptService.createRun(threadId, assistantId);
        return gptService.getResponse(threadId, runId);
    }
}
