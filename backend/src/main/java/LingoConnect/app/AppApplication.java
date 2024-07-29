package LingoConnect.app;

import javax.sound.sampled.*;

import LingoConnect.app.controller.PronunciationController;
import LingoConnect.app.service.PronunciationEvalService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) throws InterruptedException, UnsupportedAudioFileException, IOException {
		ApplicationContext context = SpringApplication.run(AppApplication.class, args);

		PronunciationController bean = context.getBean(PronunciationController.class);
		PronunciationEvalService pronunciationEvalService = context.getBean(PronunciationEvalService.class);

//		String fileName = "soundBlob.pcm";
//
//		bean.saveRaw(new File("audio/soundBlob.wav"),"audio/soundBlob");
//		pronunciationEvalService.evaluate(fileName);

//				String fileName = "001_034.mp3";
//		pronunciationEvalService.evaluate(fileName);

//		pronunciationEvalService.evaluate(fileName);
//		Path targetPath = Paths.get("audio/" + fileName);
//		File wavFile = targetPath.toFile();
//		bean.convertWavToPcm(wavFile, pcmFile, PCM_FORMAT);
	}

}
