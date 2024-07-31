package LingoConnect.app.repository;

import LingoConnect.app.entity.Feedback;
import LingoConnect.app.entity.TopQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByTopQuestion(TopQuestion topQuestion);

    List<Feedback> findAllByTopic(String topic);
}
