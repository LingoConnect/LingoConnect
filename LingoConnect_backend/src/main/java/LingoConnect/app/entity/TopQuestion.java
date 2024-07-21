package LingoConnect.app.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class TopQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false, length = 1024)
    private String question;

    @Column(nullable = false)
    private String difficulty;

    public TopQuestion() {
    }

    @Builder
    public TopQuestion(Long id, String topic, String question, String difficulty) {
        this.id = id;
        this.topic = topic;
        this.question = question;
        this.difficulty = difficulty;
    }
}
