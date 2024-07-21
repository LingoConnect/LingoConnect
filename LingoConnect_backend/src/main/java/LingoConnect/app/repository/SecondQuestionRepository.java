package LingoConnect.app.repository;

import LingoConnect.app.dto.TopQuestionDTO;
import LingoConnect.app.entity.SecondQuestion;
import LingoConnect.app.entity.TopQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface SecondQuestionRepository extends JpaRepository<SecondQuestion, Long> {
    ArrayList<SecondQuestion> findAllByTopQuestion(TopQuestion topQuestion);
}
