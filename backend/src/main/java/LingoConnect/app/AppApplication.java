package LingoConnect.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.IOException;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) throws InterruptedException, UnsupportedAudioFileException, IOException {
		ApplicationContext context = SpringApplication.run(AppApplication.class, args);
	}

}
