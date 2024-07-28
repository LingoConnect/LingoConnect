package LingoConnect.app;

import javax.sound.sampled.*;

import LingoConnect.app.controller.PronunciationController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) throws InterruptedException, UnsupportedAudioFileException, IOException {
		ApplicationContext context = SpringApplication.run(AppApplication.class, args);

//		PronunciationController bean = context.getBean(PronunciationController.class);
//		String fileName = "soundBlob.wav";
//		Path targetPath = Paths.get("audio/" + fileName);
//		File wavFile = targetPath.toFile();
//		bean.convertWavToPcm(wavFile, pcmFile, PCM_FORMAT);
	}

}
