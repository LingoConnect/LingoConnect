package LingoConnect.app.service;

import LingoConnect.app.dto.SecondQuestionDTO;
import LingoConnect.app.entity.SecondQuestion;
import LingoConnect.app.entity.TopQuestion;
import LingoConnect.app.repository.SecondQuestionRepository;
import LingoConnect.app.repository.TopQuestionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class SecondQuestionService {

    private final SecondQuestionRepository secondQuestionRepository;
    private final TopQuestionRepository topQuestionRepository;

    @Transactional
    public Long createSecondQuestion(SecondQuestionDTO secondQuestionDTO) {
        SecondQuestion secondQuestion = toEntity(secondQuestionDTO);
        SecondQuestion saved = secondQuestionRepository.save(secondQuestion);
        return saved.getId();
    }

    @Transactional
    public SecondQuestionDTO getSecondQuestionById(Long id) {
        SecondQuestion secondQuestion = secondQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No SecondQuestion found with id: " + id));
        return toDto(secondQuestion);
    }

    @Transactional
    public SecondQuestionDTO updateSecondQuestion(Long id, SecondQuestionDTO secondQuestionDTO) {
        SecondQuestion existingSecondQuestion = secondQuestionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No SecondQuestion found with id: " + id));

        TopQuestion topQuestion = topQuestionRepository.findById(secondQuestionDTO.getTopQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + secondQuestionDTO.getTopQuestionId()));

        // 엔티티를 새로 생성하여 변경사항 적용
        SecondQuestion updatedSecondQuestion = SecondQuestion.builder()
                .id(existingSecondQuestion.getId()) // 기존 ID 유지
                .question(secondQuestionDTO.getQuestion()) // 새 질문
                .topQuestion(topQuestion) // 연결된 TopQuestion 업데이트
                .imageName(secondQuestionDTO.getImageName())
                .build();

        secondQuestionRepository.save(updatedSecondQuestion);
        return toDto(updatedSecondQuestion);
    }

    @Transactional
    public void deleteSecondQuestion(Long id) {
        secondQuestionRepository.deleteById(id);
    }

    private SecondQuestionDTO toDto(SecondQuestion secondQuestion) {
        return SecondQuestionDTO.builder()
                .id(secondQuestion.getId())
                .question(secondQuestion.getQuestion())
                .topQuestionId(secondQuestion.getTopQuestion().getId())
                .imageName(secondQuestion.getImageName())
                .build();
    }

    private SecondQuestion toEntity(SecondQuestionDTO secondQuestionDTO) {
        TopQuestion topQuestion = topQuestionRepository.findById(secondQuestionDTO.getTopQuestionId())
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + secondQuestionDTO.getTopQuestionId()));

        return SecondQuestion.builder()
                .question(secondQuestionDTO.getQuestion())
                .topQuestion(topQuestion)
                .imageName(secondQuestionDTO.getImageName())
                .build();
    }

    public ArrayList<SecondQuestionDTO> findByTopQuestionId(Long topQuestionId){
        TopQuestion topQuestion = topQuestionRepository.findById(topQuestionId)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with id: " + topQuestionId));

        ArrayList<SecondQuestion> allByTopQuestion = secondQuestionRepository.findAllByTopQuestion(topQuestion);
        ArrayList<SecondQuestionDTO> dtos = new ArrayList();

        for(SecondQuestion secondQuestion : allByTopQuestion){
            dtos.add(toDto(secondQuestion));
        }

        return dtos;
    }
}
