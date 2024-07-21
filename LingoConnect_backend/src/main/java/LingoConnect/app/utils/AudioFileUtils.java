package LingoConnect.app.utils;

import org.springframework.stereotype.Component;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

@Component
public class AudioFileUtils {

    public static String convertAndStorePcm(InputStream audioData) throws IOException, UnsupportedAudioFileException {
        // 버퍼를 사용하여 InputStream의 데이터를 읽습니다.
        byte[] buffer = new byte[audioData.available()];
        audioData.read(buffer);
        ByteArrayInputStream bis = new ByteArrayInputStream(buffer);

        // AudioInputStream 생성
        AudioInputStream ais = AudioSystem.getAudioInputStream(bis);

        // 파일 저장을 위한 디렉토리 확인 및 생성
        File directory = new File("src/main/resources/audio");
        if (!directory.exists()) {
            directory.mkdirs(); // 디렉토리가 없으면 생성
        }

        String fileName = "convertedAudio.wav";
        // 파일 객체 생성
        File outputFile = new File(directory, fileName); // .pcm에서 .wav로 수정

        // WAVE 형식으로 오디오 데이터 쓰기
        AudioSystem.write(ais, AudioFileFormat.Type.WAVE, outputFile);

        return fileName;
    }
}