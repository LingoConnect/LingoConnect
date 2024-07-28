package LingoConnect.app.repository;

import LingoConnect.app.entity.TopQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopQuestionRepository extends JpaRepository<TopQuestion, Long> {
    Optional<TopQuestion> findByTopic(String topic);
    Optional<TopQuestion> findByQuestion(String question);

    @Query("SELECT DISTINCT tq.topic FROM TopQuestion tq")
    List<String> findDistinctTopics();

    List<TopQuestion> findAllByTopic(String topic);
}
