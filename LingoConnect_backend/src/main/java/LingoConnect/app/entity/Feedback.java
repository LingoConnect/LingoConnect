package LingoConnect.app.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "topic", nullable = false)
    private String topic;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "user_answer", nullable = false)
    private String userAnswer;

    @Column(name = "feedback", nullable = false)
    private String feedback;

    // Default constructor for JPA
    public Feedback() {
    }

    @Builder
    public Feedback(Long id, User user, String topic, String question, String userAnswer, String feedback) {
        this.id = id;
        this.user = user;
        this.topic = topic;
        this.question = question;
        this.userAnswer = userAnswer;
        this.feedback = feedback;
    }
}
