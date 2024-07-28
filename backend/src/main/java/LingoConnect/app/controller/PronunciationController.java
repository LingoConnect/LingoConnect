package LingoConnect.app.controller;

import LingoConnect.app.response.SuccessResponse;
import LingoConnect.app.service.PronunciationEvalService;
import LingoConnect.app.service.SttService;
import LingoConnect.app.utils.AudioFileUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.*;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/pronunciation")
public class PronunciationController {
    private FileInputStream fstream = null;
    private byte[] audioBytes = new byte[1024];
    private byte[] buff = new byte[1024];
    private int read;

    private final PronunciationEvalService pronunciationEvalService;
    private final SttService sttService;
    private final String audioFilePath;

    public PronunciationController(PronunciationEvalService pronunciationEvalService, SttService sttService, @Value("${etri.file-path}") String audioFilePath) {
        this.pronunciationEvalService = pronunciationEvalService;
        this.sttService = sttService;
        this.audioFilePath = audioFilePath;
    }

    @PostMapping("/")
    @Transactional
    @Operation(
            summary = "Upload webm file to get pronunciation evaluation and to get text from voice data",
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
    public ResponseEntity<?> evaluateAndExtractVoiceData(@RequestParam("audio") MultipartFile voiceData) throws IOException, UnsupportedAudioFileException {
        if (voiceData.isEmpty()) {
            log.error("Failed to upload the file because it is empty");
            return ResponseEntity.notFound().build();
        }

        String fileName = voiceData.getOriginalFilename();
        Path targetPath = Paths.get(audioFilePath + fileName);

        log.info("Received file: {}", fileName);
        log.info("File size: {} bytes", voiceData.getSize());
        log.info("File content type: {}", voiceData.getContentType());

        // Save the uploaded webm file
        Files.copy(voiceData.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        File wavFile = targetPath.toFile();
        String pcm = targetPath.toString().replace(".wav",".pcm");
        File pcmFile = new File(pcm);

        try {
            // Convert wav to pcm
            convertWavToPcm(wavFile, pcmFile);

            String evaluated = pronunciationEvalService.evaluate(wavFile.getName());
            String text = sttService.speechToText(wavFile.getName());

            log.info("evaluated : {}", evaluated);
            log.info("text : {}", text);
            JsonObject jsonObject = new JsonObject();
            jsonObject.addProperty("score", evaluated);
            jsonObject.addProperty("text", text);

            Gson gson = new Gson(); // Gson 객체 생성
            String jsonResponse = gson.toJson(jsonObject);

            return ResponseEntity.ok().body(jsonResponse);
        } catch (IOException e) {
            log.error("IO Exception occurred: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 처리 중 I/O 오류가 발생했습니다.");
        }
    }

    private static final AudioFormat PCM_FORMAT = new AudioFormat(
            16000, // sampleRate
            16,    // sampleSizeInBits
            1,     // channels
            true,  // signed
            false  // bigEndian
    );
    public static void convertWavToPcm(File wavFile, File pcmFile) throws IOException {
        try (FileInputStream wavStream = new FileInputStream(wavFile);
             FileOutputStream pcmStream = new FileOutputStream(pcmFile)) {

            byte[] header = new byte[44];
            if (wavStream.read(header) != 44) {
                throw new IOException("Invalid WAV file header");
            }

            // Extract the number of channels, sample rate, and bits per sample
            int channels = ByteBuffer.wrap(header, 22, 2).order(ByteOrder.LITTLE_ENDIAN).getShort();
            int sampleRate = ByteBuffer.wrap(header, 24, 4).order(ByteOrder.LITTLE_ENDIAN).getInt();
            int bitsPerSample = ByteBuffer.wrap(header, 34, 2).order(ByteOrder.LITTLE_ENDIAN).getShort();

            System.out.println("Channels: " + channels);
            System.out.println("Sample Rate: " + sampleRate);
            System.out.println("Bits Per Sample: " + bitsPerSample);

            // Calculate the byte rate and block align
            int byteRate = sampleRate * channels * bitsPerSample / 8;
            int blockAlign = channels * bitsPerSample / 8;

            System.out.println("Byte Rate: " + byteRate);
            System.out.println("Block Align: " + blockAlign);

            // Skip the rest of the header and extract the PCM data
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = wavStream.read(buffer)) != -1) {
                pcmStream.write(buffer, 0, bytesRead);
            }
        }
    }
//    public static void convertWavToPcm(File wavFile, File pcmFile, AudioFormat pcmFormat) throws IOException, UnsupportedAudioFileException {
//        try (AudioInputStream wavAudioStream = AudioSystem.getAudioInputStream(wavFile);
//             AudioInputStream pcmAudioStream = AudioSystem.getAudioInputStream(pcmFormat, wavAudioStream);
//             ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//             FileOutputStream fileOutputStream = new FileOutputStream(pcmFile)) {
//
//            // Read the converted PCM audio stream and write it to the output stream
//            byte[] buffer = new byte[1024];
//            int bytesRead;
//            while ((bytesRead = pcmAudioStream.read(buffer)) != -1) {
//                byteArrayOutputStream.write(buffer, 0, bytesRead);
//            }
//
//            // Convert the byte array output stream to byte array
//            byte[] audioBytes = byteArrayOutputStream.toByteArray();
//
//            // Write the byte array to the output file
//            fileOutputStream.write(audioBytes);
//        }
//    }
//
//    //바이트 배열을 Raw 파일로 저장
//    //Save byte array as Raw file
//    public void saveRaw(File file, String targetPath) throws UnsupportedAudioFileException {
//        OutputStream output = null;
//
//        try {
//            output = new FileOutputStream(targetPath + ".raw");
//        } catch (FileNotFoundException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//
//        try {
//            //핵심 코드
//            output.write(formatWavToRaw(changeFormat(AudioToByte(file), FORMAT)));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    //Wav 파일에서 헤더 제거
//    //Strip the header from the WAV file
//    public byte[] formatWavToRaw(@NotNull final byte[] audioFileContent) {
//        log.info("formatWavToRaw");
//        return Arrays.copyOfRange(audioFileContent, 44, audioFileContent.length);
//    }
//
//    //기존의 Wav 파일(바이트 배열) 을 다른 형식의 Wav 형식 (바이트 배열) 로 변환
//    //WAV to WAV (different audio format)
//    public byte[] changeFormat(@NotNull final byte[] audioFileContent, @NotNull final AudioFormat audioFormat)
//            throws IOException, UnsupportedAudioFileException {
//        log.info("changeFormat");
//        try (final AudioInputStream originalAudioStream = AudioSystem
//                .getAudioInputStream(new ByteArrayInputStream(audioFileContent));
//             final AudioInputStream formattedAudioStream = AudioSystem.getAudioInputStream(audioFormat,
//                     originalAudioStream);
//             final AudioInputStream lengthAddedAudioStream = new AudioInputStream(formattedAudioStream, audioFormat,
//                     audioFileContent.length);
//             final ByteArrayOutputStream convertedOutputStream = new ByteArrayOutputStream()) {
//            AudioSystem.write(lengthAddedAudioStream, AudioFileFormat.Type.WAVE, convertedOutputStream);
//            return convertedOutputStream.toByteArray();
//        }
//    }
//
//    //기존의 wav 파일을 바이트 배열로 변환
//    //Convert existing wav file to byte array
//    public byte[] AudioToByte(File file) {
//        log.info("AudioToByte");
//        try {
//            File inFile = file;
//            fstream = new FileInputStream(inFile);
//
//            ByteArrayOutputStream out = new ByteArrayOutputStream();
//            BufferedInputStream in = new BufferedInputStream(fstream);
//
//            while ((read = in.read(buff)) > 0) {
//                out.write(buff, 0, read);
//            }
//            out.flush();
//            audioBytes = out.toByteArray();
//
//            // Do something with the stream
//        } catch (FileNotFoundException ex) {
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return audioBytes;
//    }

}