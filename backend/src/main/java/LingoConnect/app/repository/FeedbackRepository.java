package LingoConnect.app.repository;

import LingoConnect.app.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
