package LingoConnect.app.client;


import com.google.gson.JsonArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.google.gson.JsonObject;

@Component
@Slf4j
public class OpenAiClient {

    private final WebClient webClient;
    private final String apiKey;
    private final String instructions;

    public OpenAiClient(WebClient.Builder webClientBuilder,
                        @Value("${openai.api-key}") String apiKey,
                        @Value("${openai.instructions}") String instructions) {
        this.webClient = webClientBuilder
//                .filter(logRequest())
//                .filter(logResponse())
                .build();
        this.apiKey = apiKey;
        this.instructions = instructions;
    }

    public String createAssistant(String model) {
        JsonObject json = new JsonObject();
        json.addProperty("name", "lingoConnect");
        json.addProperty("instructions", instructions);
        json.addProperty("model", model);
        JsonArray tools = new JsonArray();
        JsonObject tool = new JsonObject();
        tool.addProperty("type", "file_search");
        tools.add(tool);

        json.add("tools", tools);

        return webClient.post()
                .uri("https://api.openai.com/v1/assistants")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .bodyValue(json.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String listAssistant() {
        return webClient.get()
                .uri("https://api.openai.com/v1/assistants")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String createThread() {
        return webClient.post()
                .uri("https://api.openai.com/v1/threads")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String createMessage(String threadId, String content) {
        JsonObject json = new JsonObject();
        json.addProperty("role", "user");
        json.addProperty("content", content);

        String fullUrl = String.format("https://api.openai.com/v1/threads/%s/messages", threadId);
        return webClient.post()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .bodyValue(json.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String createRun(String threadId, String assistantId) {
        JsonObject json = new JsonObject();
        json.addProperty("assistant_id", assistantId);

        String fullUrl = String.format("https://api.openai.com/v1/threads/%s/runs", threadId);
        return webClient.post()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .bodyValue(json.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String checkRun(String threadId, String runId) {
        String fullUrl = String.format("https://api.openai.com/v1/threads/%s/runs/%s", threadId, runId);
        return webClient.get()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // 결과를 가져오는 것은 ListMessage 결과 내의 data -> content -> text -> value
    public String listMessages(String threadId) {

        String fullUrl = String.format("https://api.openai.com/v1/threads/%s/messages", threadId);
        return webClient.get()
                .uri(fullUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .header("OpenAI-Beta", "assistants=v2")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    private ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            log.info("Request: {} {}", clientRequest.method(), clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> log.info("{}: {}", name, value)));
            return Mono.just(clientRequest);
        });
    }

    private ExchangeFilterFunction logResponse() {
        return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
            log.info("Response status: {}", clientResponse.statusCode());
            clientResponse.headers().asHttpHeaders().forEach((name, values) -> values.forEach(value -> log.info("{}: {}", name, value)));
            return Mono.just(clientResponse);
        });
    }

    public byte[] getAudio(String text) {

        JsonObject json = new JsonObject();
        json.addProperty("model", "tts-1");
        json.addProperty("input", text);
        json.addProperty("voice", "nova");
        json.addProperty("response_format", "pcm");

        return webClient.post()
                .uri("https://api.openai.com/v1/audio/speech")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(json.toString())
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }


}
