package LingoConnect.app.service;


import LingoConnect.app.dto.TopQuestionDTO;
import LingoConnect.app.entity.TopQuestion;
import LingoConnect.app.repository.TopQuestionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopQuestionService {

    private final TopQuestionRepository topQuestionRepository;

    @Transactional
    public Long createTopQuestion(TopQuestionDTO topQuestionDTO) {
        TopQuestion topQuestion = toEntity(topQuestionDTO);

        TopQuestion save = topQuestionRepository.save(topQuestion);
        return save.getId();
    }

    @Transactional
    public TopQuestionDTO getTopQuestionById(Long id) {
        TopQuestion topQuestion = topQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + id));
        return toDto(topQuestion);
    }

    @Transactional
    public TopQuestionDTO updateTopQuestion(Long id, TopQuestionDTO topQuestionDTO) {
        TopQuestion existingTopQuestion = topQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + id));

        // 빌더를 사용하여 엔티티의 새 인스턴스를 생성
        TopQuestion updatedTopQuestion = TopQuestion.builder()
                .id(existingTopQuestion.getId()) // 기존 ID 유지
                .topic(topQuestionDTO.getTopic()) // 새 주제
                .question(topQuestionDTO.getQuestion()) // 새 질문
                .difficulty(topQuestionDTO.getDifficulty())
                .build();

        // 변경된 내용을 저장
        topQuestionRepository.save(updatedTopQuestion);
        return toDto(updatedTopQuestion);
    }

    // Delete
    @Transactional
    public void deleteTopQuestion(Long id) {
        TopQuestion topQuestion = topQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + id));
        topQuestionRepository.delete(topQuestion);
    }

    private static TopQuestionDTO toDto(TopQuestion topQuestion) {
        TopQuestionDTO topQuestionDTO = TopQuestionDTO.builder()
                .id(topQuestion.getId())
                .topic(topQuestion.getTopic())
                .question(topQuestion.getQuestion())
                .difficulty(topQuestion.getDifficulty())
                .build();

        return topQuestionDTO;
    }

    private static TopQuestion toEntity(TopQuestionDTO topQuestionDTO) {
        TopQuestion topQuestion = TopQuestion.builder()
                .topic(topQuestionDTO.getTopic())
                .question(topQuestionDTO.getQuestion())
                .difficulty(topQuestionDTO.getDifficulty())
                .build();
        return topQuestion;
    }

    public TopQuestionDTO findByTopic(String topic) {
        TopQuestion topquestion = topQuestionRepository.findByTopic(topic)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with topic"));

        return toDto(topquestion);
    }

    public TopQuestionDTO findById(String id) {
        TopQuestion topquestion = topQuestionRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id"));

        return toDto(topquestion);
    }

    public TopQuestionDTO findByQuestion(String question) {
        TopQuestion topquestion = topQuestionRepository.findByQuestion(question)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with top question"));

        return toDto(topquestion);
    }

    public List<String> getDistinctTopics() {
        return topQuestionRepository.findDistinctTopics();
    }

    public ArrayList<TopQuestionDTO> findAllByTopic(String topic) {
        List<TopQuestion> topQuestionList = topQuestionRepository.findAllByTopic(topic);

        ArrayList<TopQuestionDTO> topQuestionDTOS = new ArrayList<>();

        for(TopQuestion topQuestion : topQuestionList){
            TopQuestionDTO dto = toDto(topQuestion);

            topQuestionDTOS.add(dto);
        }

        return topQuestionDTOS;
    }
}
