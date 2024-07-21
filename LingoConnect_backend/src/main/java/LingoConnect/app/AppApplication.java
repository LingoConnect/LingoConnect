package LingoConnect.app;

import LingoConnect.app.service.GptService;
import LingoConnect.app.service.SttService;
import LingoConnect.app.service.TtsService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) throws InterruptedException {
		ApplicationContext context = SpringApplication.run(AppApplication.class, args);
	}

}
