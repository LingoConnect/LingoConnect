package LingoConnect.app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    // Regular expression for validating an Email
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    public String sendEmail(String title, String content, String receiver) {
        try {
            if (!isValidEmail(receiver)) {
                log.error("Invalid email address: " + receiver);
                return "Failed to send email: Invalid email address";
            }

            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

            // 1. 메일 수신자 설정
            simpleMailMessage.setTo(receiver);

            // 2. 메일 제목 설정
            simpleMailMessage.setSubject(title);

            // 3. 메일 내용 설정
            simpleMailMessage.setText(content);

            // 4. 메일 전송
            javaMailSender.send(simpleMailMessage);

            return "Email sent successfully";
        } catch (Exception e) {
            log.error("Error sending email: ", e);
            return "Failed to send email";
        }
    }

    private boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }
}
