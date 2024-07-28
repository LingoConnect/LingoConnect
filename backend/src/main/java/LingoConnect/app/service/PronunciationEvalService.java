package LingoConnect.app.service;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PronunciationEvalService {
    private final String openApiURL;
    private final String accessKey;
    private final String languageCode;
    private final String audioFilePath;

    public PronunciationEvalService(@Value("${etri.url}") String openApiURL,
                                     @Value("${etri.access-key}") String accessKey,
                                     @Value("${etri.language-code}") String languageCode,
                                     @Value("${etri.file-path}") String audioFilePath) {
        this.openApiURL = openApiURL;
        this.accessKey = accessKey;
        this.languageCode = languageCode;
        this.audioFilePath = audioFilePath;
    }

    public String evaluate(String audioFileName){
        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();
        
        String filePath = audioFilePath + audioFileName;
        String audioContents = null;
        
        try {
            Path path = Paths.get(filePath);
            byte[] audioBytes = Files.readAllBytes(path);
            audioContents = Base64.getEncoder().encodeToString(audioBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        argument.put("language_code", languageCode);
        argument.put("audio", audioContents);
        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;
        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);

            JsonObject object = JsonParser.parseString(responBody).getAsJsonObject();
            String result = object.get("return_object").getAsJsonObject().get("score").getAsString();

            log.info("평가 결과: {}", result);
            return result;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return responBody;
    }

}
