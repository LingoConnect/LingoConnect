package LingoConnect.app;

import LingoConnect.app.entity.SecondQuestion;
import LingoConnect.app.entity.TopQuestion;
import LingoConnect.app.repository.SecondQuestionRepository;
import LingoConnect.app.repository.TopQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TopQuestionRepository topQuestionRepository;

    @Autowired
    private SecondQuestionRepository secondQuestionRepository;

    @Override
    public void run(String... args) throws Exception {
        if (topQuestionRepository.count() == 0) { // 테이블이 비어있는지 확인
            insertTopData();
        }

        if (secondQuestionRepository.count() == 0) { // 테이블이 비어있는지 확인
            insertSecondData();
        }
    }

    private void insertTopData() {
        createTopQuestion("운동", "운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?","초급");
        createTopQuestion("운동", "운동하다가 친구가 넘어지면 너는 어떻게 할 거야?","초급");
        createTopQuestion("운동", "축구할 때 규칙을 안 지키면 어떤 일이 생길까?","초급");
        createTopQuestion("운동", "친구가 농구를 어려워하면 너는 어떻게 도와줄 거야?","초급");
        createTopQuestion("운동", "운동하면서 쓰레기를 그냥 버리면 안 되는 이유가 뭘까?","초급");
        createTopQuestion("여행", "여행 가서 새로운 친구를 만나면 어떤 점이 좋을까?","초급");
        createTopQuestion("여행", "여행 중에 길 잃은 사람을 보면 너는 어떻게 할 거야?","초급");
        createTopQuestion("여행", "여행지에서 쓰레기를 버리지 않으면 어떤 좋은 일이 생길까?","초급");
        createTopQuestion("여행", "여행 중에 친구랑 의견이 다르면 어떻게 해결할 수 있을까?","초급");
        createTopQuestion("여행", "다른 나라에 가면 그 나라 문화를 존중하는 게 왜 중요할까?","초급");
        createTopQuestion("학교", "학교에서 친구랑 싸우면 어떻게 화해할 수 있을까?","초급");
        createTopQuestion("학교", "수업 시간에 친구들이랑 이야기하지 않는 게 왜 중요할까?","초급");
        createTopQuestion("학교", "학교에서 어려워하는 친구를 보면 어떻게 도와줄 수 있을까?","초급");
        createTopQuestion("학교", "선생님께 예의를 지키는 게 왜 중요할까?","초급");
        createTopQuestion("학교", "학교에서 배운 것을 집에서 어떻게 사용할 수 있을까?","초급");
        createTopQuestion("음악", "친구랑 같이 노래 부르면 왜 더 즐거울까?","초급");
        createTopQuestion("음악", "콘서트에서 예의를 지키는 게 왜 필요할까?","초급");
        createTopQuestion("음악", "친구랑 같이 악기를 연주하면 어떤 점이 좋을까?","초급");
        createTopQuestion("음악", "음악을 통해 다른 나라의 문화를 이해할 수 있을까?","초급");
        createTopQuestion("음악", "음악을 배우면서 인내심을 기르는 게 왜 중요할까?","초급");
        createTopQuestion("취미", "친구랑 같은 취미를 가지면 왜 더 재미있을까?","초급");
        createTopQuestion("취미", "친구랑 같이 취미 활동을 하면 어떤 점이 좋을까?","초급");
        createTopQuestion("취미", "취미 활동을 하면서 배운 것을 어떻게 일상에서 사용할 수 있을까?","초급");
        createTopQuestion("취미", "새로운 취미를 시도해보는 게 왜 재미있을까?","초급");
        createTopQuestion("취미", "취미 활동 중에 친구를 배려하는 방법은 뭐가 있을까?","초급");
        createTopQuestion("음식", "친구랑 같이 음식을 먹으면 왜 더 맛있을까?","초급");
        createTopQuestion("음식", "음식을 나눠 먹으면 어떤 점이 좋을까?","초급");
        createTopQuestion("음식", "음식을 먹을 때 예의를 지키는 게 왜 중요할까?","초급");
        createTopQuestion("음식", "다른 나라 음식을 먹어보는 게 왜 재미있을까?","초급");
        createTopQuestion("음식", "음식을 남기지 않고 먹는 게 왜 좋을까?","초급");
        createTopQuestion("영화", "친구랑 영화를 보면 왜 더 재미있을까?","초급");
        createTopQuestion("영화", "영화관에서 예의를 지키는 게 왜 중요할까?","초급");
        createTopQuestion("영화", "영화를 보고 나서 친구랑 이야기하면 어떤 점이 좋을까?","초급");
        createTopQuestion("영화", "다른 나라 영화를 보면 어떤 점이 재미있을까?","초급");
        createTopQuestion("영화", "영화를 통해 배운 것을 일상에서 어떻게 사용할 수 있을까?","초급");
    }

    private void insertSecondData() {
        createSecondQuestion("운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?", "친구랑 같이 운동하면 어떤 게임을 가장 좋아해?", "운동", "운동.jpeg");
        createSecondQuestion("운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?", "친구랑 운동할 때 어떤 점이 가장 즐거워?", "운동", "운동.jpeg");
        createSecondQuestion("운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?", "친구랑 운동하면서 재미있었던 기억이 있어? 어떤 일이 있었어?", "운동", "운동.jpeg");
        createSecondQuestion("운동할 때 친구랑 같이 하면 더 재미있지? 왜 그럴까?", "친구랑 같이 운동하면 더 잘할 수 있는 이유가 뭐라고 생각해?", "운동", "운동.jpeg");
        createSecondQuestion("운동하다가 친구가 넘어지면 너는 어떻게 할 거야?", "친구가 다쳤을 때 먼저 해야 할 일은 뭐야?", "운동", "운동.jpeg");
        createSecondQuestion("운동하다가 친구가 넘어지면 너는 어떻게 할 거야?", "너도 다친 적이 있으면 친구가 어떻게 도와줬어?", "운동", "운동.jpeg");
        createSecondQuestion("운동하다가 친구가 넘어지면 너는 어떻게 할 거야?", "친구를 도와준 후에 기분이 어땠어?", "운동", "운동.jpeg");
        createSecondQuestion("운동하다가 친구가 넘어지면 너는 어떻게 할 거야?", "친구를 도와주면서 배운 점이 있다면 뭐야?", "운동", "운동.jpeg");
        createSecondQuestion("축구할 때 규칙을 안 지키면 어떤 일이 생길까?", "규칙을 안 지키면 게임이 어떻게 될까?", "운동", "운동.jpeg");
        createSecondQuestion("축구할 때 규칙을 안 지키면 어떤 일이 생길까?", "규칙을 잘 지키면 어떤 점이 좋아?", "운동", "운동.jpeg");
        createSecondQuestion("축구할 때 규칙을 안 지키면 어떤 일이 생길까?", "규칙을 어긴 친구가 있으면 너는 어떻게 할 거야?", "운동", "운동.jpeg");
        createSecondQuestion("축구할 때 규칙을 안 지키면 어떤 일이 생길까?", "규칙을 지키는 게 왜 중요하다고 생각해?", "운동", "운동.jpeg");
        createSecondQuestion("친구가 농구를 어려워하면 너는 어떻게 도와줄 거야?", "친구에게 어떤 방법으로 농구를 가르쳐 줄 수 있을까?", "운동", "운동.jpeg");
        createSecondQuestion("친구가 농구를 어려워하면 너는 어떻게 도와줄 거야?", "네가 농구를 처음 배울 때 누가 도와줬어?", "운동", "운동.jpeg");
        createSecondQuestion("친구가 농구를 어려워하면 너는 어떻게 도와줄 거야?", "친구가 더 잘하게 되면 네 기분은 어떨 것 같아?", "운동", "운동.jpeg");
        createSecondQuestion("친구가 농구를 어려워하면 너는 어떻게 도와줄 거야?", "친구를 도와줄 때 가장 중요한 점은 뭐라고 생각해?", "운동", "운동.jpeg");
        createSecondQuestion("운동하면서 쓰레기를 그냥 버리면 안 되는 이유가 뭘까?", "쓰레기를 주워서 버리면 어떤 점이 좋을까?", "운동", "운동.jpeg");
        createSecondQuestion("운동하면서 쓰레기를 그냥 버리면 안 되는 이유가 뭘까?", "운동하는 장소를 깨끗하게 유지하면 어떤 변화가 생길까?", "운동", "운동.jpeg");
        createSecondQuestion("운동하면서 쓰레기를 그냥 버리면 안 되는 이유가 뭘까?", "친구들이 다 같이 쓰레기를 버리지 않으면 어떻게 될까?", "운동", "운동.jpeg");
        createSecondQuestion("운동하면서 쓰레기를 그냥 버리면 안 되는 이유가 뭘까?", "환경을 보호하는 다른 방법들은 뭐가 있을까?", "운동", "운동.jpeg");
        createSecondQuestion("여행 가서 새로운 친구를 만나면 어떤 점이 좋을까?", "여행 중에 만난 친구와 어떤 활동을 같이 할 수 있을까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 가서 새로운 친구를 만나면 어떤 점이 좋을까?", "새로운 친구와 이야기하면 어떤 점이 재미있어?", "여행", "여행.jpeg");
        createSecondQuestion("여행 가서 새로운 친구를 만나면 어떤 점이 좋을까?", "여행 중에 만난 친구와 연락을 계속하면 어떤 점이 좋을까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 가서 새로운 친구를 만나면 어떤 점이 좋을까?", "새로운 친구에게 어떤 한국 문화를 소개하고 싶어?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 길 잃은 사람을 보면 너는 어떻게 할 거야?", "길 잃은 사람을 도와줄 때 무엇을 먼저 해야 할까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 길 잃은 사람을 보면 너는 어떻게 할 거야?", "너도 길을 잃은 적이 있으면 어떻게 해결했어?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 길 잃은 사람을 보면 너는 어떻게 할 거야?", "도움을 준 후에 길 잃은 사람의 반응은 어떨 것 같아?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 길 잃은 사람을 보면 너는 어떻게 할 거야?", "여행 중에 다른 사람을 도와주는 것이 왜 중요하다고 생각해?", "여행", "여행.jpeg");
        createSecondQuestion("여행지에서 쓰레기를 버리지 않으면 어떤 좋은 일이 생길까?", "쓰레기를 버리지 않으면 여행지가 어떻게 달라질까?", "여행", "여행.jpeg");
        createSecondQuestion("여행지에서 쓰레기를 버리지 않으면 어떤 좋은 일이 생길까?", "쓰레기를 주워서 버리는 것이 왜 중요할까?", "여행", "여행.jpeg");
        createSecondQuestion("여행지에서 쓰레기를 버리지 않으면 어떤 좋은 일이 생길까?", "여행 중에 친구들과 함께 환경을 지키려면 어떤 일을 할 수 있을까?", "여행", "여행.jpeg");
        createSecondQuestion("여행지에서 쓰레기를 버리지 않으면 어떤 좋은 일이 생길까?", "깨끗한 여행지를 보면 기분이 어떻게 달라질까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 친구랑 의견이 다르면 어떻게 해결할 수 있을까?", "친구와 다른 의견을 조율하려면 어떻게 해야 할까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 친구랑 의견이 다르면 어떻게 해결할 수 있을까?", "친구의 의견을 듣는 것이 왜 중요할까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 친구랑 의견이 다르면 어떻게 해결할 수 있을까?", "서로 다른 의견을 합치면 어떤 점이 좋을까?", "여행", "여행.jpeg");
        createSecondQuestion("여행 중에 친구랑 의견이 다르면 어떻게 해결할 수 있을까?", "여행 중에 친구와 의견 차이가 있었던 경험이 있니? 어떻게 해결했어?", "여행", "여행.jpeg");
        createSecondQuestion("다른 나라에 가면 그 나라 문화를 존중하는 게 왜 중요할까?", "다른 나라 문화를 존중하면 그 나라 사람들이 어떻게 느낄까?", "여행", "여행.jpeg");
        createSecondQuestion("다른 나라에 가면 그 나라 문화를 존중하는 게 왜 중요할까?", "다른 나라의 문화를 배우는 것이 왜 재미있을까?", "여행", "여행.jpeg");
        createSecondQuestion("다른 나라에 가면 그 나라 문화를 존중하는 게 왜 중요할까?", "문화 차이를 이해하면 여행이 어떻게 달라질까?", "여행", "여행.jpeg");
        createSecondQuestion("다른 나라에 가면 그 나라 문화를 존중하는 게 왜 중요할까?", "다른 나라에서 예의 바르게 행동하면 어떤 좋은 일이 생길까?", "여행", "여행.jpeg");
        createSecondQuestion("학교에서 친구랑 싸우면 어떻게 화해할 수 있을까?", "먼저 친구에게 사과할 때 어떤 말을 할 수 있을까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 친구랑 싸우면 어떻게 화해할 수 있을까?", "친구와 싸운 후에 다시 친해지려면 무엇을 같이 하면 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 친구랑 싸우면 어떻게 화해할 수 있을까?", "친구와 싸운 이유를 서로 이야기하면 어떤 점이 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 친구랑 싸우면 어떻게 화해할 수 있을까?", "화해하고 나서 친구와 함께 하고 싶은 일이 있니?", "학교", "학교.jpeg");
        createSecondQuestion("수업 시간에 친구들이랑 이야기하지 않는 게 왜 중요할까?", "수업 중에 조용히 하면 어떤 점이 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("수업 시간에 친구들이랑 이야기하지 않는 게 왜 중요할까?", "선생님이 설명하실 때 집중하는 게 왜 필요할까?", "학교", "학교.jpeg");
        createSecondQuestion("수업 시간에 친구들이랑 이야기하지 않는 게 왜 중요할까?", "수업 시간에 친구와 이야기하면 어떤 문제가 생길 수 있을까?", "학교", "학교.jpeg");
        createSecondQuestion("수업 시간에 친구들이랑 이야기하지 않는 게 왜 중요할까?", "수업이 끝난 후에 친구들과 이야기할 때 더 재미있는 이유는 뭘까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 어려워하는 친구를 보면 어떻게 도와줄 수 있을까?", "친구가 숙제를 어려워하면 너는 어떻게 도와줄 거야?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 어려워하는 친구를 보면 어떻게 도와줄 수 있을까?", "친구가 잘 이해하지 못하는 부분을 설명해 주면 어떤 점이 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 어려워하는 친구를 보면 어떻게 도와줄 수 있을까?", "친구가 슬퍼 보이면 너는 어떻게 할 거야?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 어려워하는 친구를 보면 어떻게 도와줄 수 있을까?", "친구를 도와주고 나면 네 기분은 어떻게 달라질까?", "학교", "학교.jpeg");
        createSecondQuestion("선생님께 예의를 지키는 게 왜 중요할까?", "선생님께 '고맙습니다'라고 말하면 선생님이 어떻게 느끼실까?", "학교", "학교.jpeg");
        createSecondQuestion("선생님께 예의를 지키는 게 왜 중요할까?", "선생님 말씀을 잘 들으면 어떤 점이 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("선생님께 예의를 지키는 게 왜 중요할까?", "예의 바르게 행동하면 교실 분위기가 어떻게 달라질까?", "학교", "학교.jpeg");
        createSecondQuestion("선생님께 예의를 지키는 게 왜 중요할까?", "선생님께 예의를 지키는 것이 친구들에게도 영향을 줄까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 배운 것을 집에서 어떻게 사용할 수 있을까?", "학교에서 배운 것을 부모님께 설명해 본 적 있니? 어떤 점이 좋았어?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 배운 것을 집에서 어떻게 사용할 수 있을까?", "학교에서 배운 새로운 단어를 집에서 써본 적 있니? 어떻게 썼어?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 배운 것을 집에서 어떻게 사용할 수 있을까?", "학교에서 배운 것을 친구들에게도 알려주면 어떤 점이 좋을까?", "학교", "학교.jpeg");
        createSecondQuestion("학교에서 배운 것을 집에서 어떻게 사용할 수 있을까?", "학교에서 배운 생활 습관을 집에서 어떻게 실천할 수 있을까?", "학교", "학교.jpeg");
        createSecondQuestion("친구랑 같이 노래 부르면 왜 더 즐거울까?", "친구랑 부르면 어떤 노래가 가장 신나?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 노래 부르면 왜 더 즐거울까?", "노래 부르면서 친구랑 어떤 추억이 생겼어?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 노래 부르면 왜 더 즐거울까?", "친구랑 같이 노래를 부르면 어떤 기분이 들어?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 노래 부르면 왜 더 즐거울까?", "친구랑 노래 부르면서 재미있었던 일이 있어?", "음악", "음악.jpeg");
        createSecondQuestion("콘서트에서 예의를 지키는 게 왜 필요할까?", "콘서트에서 큰 소리로 떠들면 어떤 일이 생길까?", "음악", "음악.jpeg");
        createSecondQuestion("콘서트에서 예의를 지키는 게 왜 필요할까?", "공연을 잘 볼 수 있도록 예의를 지키면 어떤 점이 좋을까?", "음악", "음악.jpeg");
        createSecondQuestion("콘서트에서 예의를 지키는 게 왜 필요할까?", "콘서트 중에 휴대폰을 사용하면 왜 안 될까?", "음악", "음악.jpeg");
        createSecondQuestion("콘서트에서 예의를 지키는 게 왜 필요할까?", "예의를 지키면서 공연을 보면 어떤 기분이 들어?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 악기를 연주하면 어떤 점이 좋을까?", "친구랑 어떤 악기를 같이 연주해보고 싶어?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 악기를 연주하면 어떤 점이 좋을까?", "함께 연주할 때 어떤 곡이 가장 즐거워?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 악기를 연주하면 어떤 점이 좋을까?", "친구와 연주하면서 배운 점이 뭐야?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같이 악기를 연주하면 어떤 점이 좋을까?", "연주를 끝낸 후 친구와 어떤 이야기를 나누고 싶어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 통해 다른 나라의 문화를 이해할 수 있을까?", "어떤 나라의 음악을 들어보고 싶어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 통해 다른 나라의 문화를 이해할 수 있을까?", "다른 나라 음악을 들으면 어떤 점이 재미있어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 통해 다른 나라의 문화를 이해할 수 있을까?", "음악을 통해 알게 된 새로운 문화가 있어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 통해 다른 나라의 문화를 이해할 수 있을까?", "그 나라의 음악을 듣고 친구들과 어떤 이야기를 나누고 싶어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 배우면서 인내심을 기르는 게 왜 중요할까?", "처음 음악을 배울 때 어려운 점이 뭐였어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 배우면서 인내심을 기르는 게 왜 중요할까?", "연습을 계속하면 어떤 점이 좋아져?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 배우면서 인내심을 기르는 게 왜 중요할까?", "인내심을 가지고 연습했을 때 어떤 성취감을 느꼈어?", "음악", "음악.jpeg");
        createSecondQuestion("음악을 배우면서 인내심을 기르는 게 왜 중요할까?", "음악 연습을 통해 배운 인내심을 다른 일에 어떻게 사용할 수 있을까?", "음악", "음악.jpeg");
        createSecondQuestion("친구랑 같은 취미를 가지면 왜 더 재미있을까?", "친구랑 같은 취미를 할 때 어떤 활동이 제일 재미있어?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같은 취미를 가지면 왜 더 재미있을까?", "친구랑 같이 하면 취미를 더 즐길 수 있는 이유는 뭐야?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같은 취미를 가지면 왜 더 재미있을까?", "친구랑 취미 활동을 하면서 어떤 새로운 것을 배웠어?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같은 취미를 가지면 왜 더 재미있을까?", "친구와 취미를 같이 하면 어떤 점이 더 좋아지는 것 같아?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같이 취미 활동을 하면 어떤 점이 좋을까?", "친구랑 같이 취미 활동을 할 때 가장 기억에 남는 순간이 뭐야?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같이 취미 활동을 하면 어떤 점이 좋을까?", "친구와 취미 활동을 하면서 어떤 협력이 필요해?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같이 취미 활동을 하면 어떤 점이 좋을까?", "같이 취미 활동을 하면서 생긴 좋은 추억이 있어?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같이 취미 활동을 하면 어떤 점이 좋을까?", "친구와 취미 활동을 할 때 어떤 점에서 서로 도울 수 있어?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동을 하면서 배운 것을 어떻게 일상에서 사용할 수 있을까?", "취미 활동에서 배운 기술을 집에서 어떻게 사용해봤어?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동을 하면서 배운 것을 어떻게 일상에서 사용할 수 있을까?", "취미 활동을 하면서 배운 인내심을 일상생활에서 어떻게 사용할 수 있을까?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동을 하면서 배운 것을 어떻게 일상에서 사용할 수 있을까?", "취미 활동을 통해 배운 것을 학교나 친구들과 공유해 본 적 있어?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동을 하면서 배운 것을 어떻게 일상에서 사용할 수 있을까?", "취미 활동을 하면서 생긴 좋은 습관이 있어?", "취미", "취미.jpeg");
        createSecondQuestion("새로운 취미를 시도해보는 게 왜 재미있을까?", "새로운 취미를 시작할 때 가장 기대되는 점이 뭐야?", "취미", "취미.jpeg");
        createSecondQuestion("새로운 취미를 시도해보는 게 왜 재미있을까?", "새로운 취미를 시도하면서 배운 재미있는 것이 있어?", "취미", "취미.jpeg");
        createSecondQuestion("새로운 취미를 시도해보는 게 왜 재미있을까?", "새로운 취미를 통해 친구들과 어떤 이야기를 나눌 수 있어?", "취미", "취미.jpeg");
        createSecondQuestion("새로운 취미를 시도해보는 게 왜 재미있을까?", "새로운 취미를 시도해보고 싶은 이유는 뭐야?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동 중에 친구를 배려하는 방법은 뭐가 있을까?", "친구가 취미 활동을 어려워할 때 너는 어떻게 도와줄 수 있어?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동 중에 친구를 배려하는 방법은 뭐가 있을까?", "친구와 취미 활동을 할 때 어떤 점을 주의해야 해?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동 중에 친구를 배려하는 방법은 뭐가 있을까?", "친구의 의견을 존중하면서 취미 활동을 하면 어떤 점이 좋을까?", "취미", "취미.jpeg");
        createSecondQuestion("취미 활동 중에 친구를 배려하는 방법은 뭐가 있을까?", "친구와 취미 활동을 하면서 서로 도울 때 기분이 어땠어?", "취미", "취미.jpeg");
        createSecondQuestion("친구랑 같이 음식을 먹으면 왜 더 맛있을까?", "친구랑 어떤 음식을 같이 먹는 게 가장 맛있었어?", "음식", "음식.jpeg");
        createSecondQuestion("친구랑 같이 음식을 먹으면 왜 더 맛있을까?", "친구와 음식을 나누면 어떤 기분이 들어?", "음식", "음식.jpeg");
        createSecondQuestion("친구랑 같이 음식을 먹으면 왜 더 맛있을까?", "친구와 음식을 먹으면서 나눈 이야기 중 기억에 남는 게 있어?", "음식", "음식.jpeg");
        createSecondQuestion("친구랑 같이 음식을 먹으면 왜 더 맛있을까?", "친구랑 음식을 함께 먹을 때 어떤 재미있는 일이 있었어?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 나눠 먹으면 어떤 점이 좋을까?", "음식을 나누면 기분이 어떻게 달라져?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 나눠 먹으면 어떤 점이 좋을까?", "친구에게 음식을 나눠주면 친구가 어떻게 반응할까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 나눠 먹으면 어떤 점이 좋을까?", "음식을 나누면서 친구와의 관계가 어떻게 좋아질까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 나눠 먹으면 어떤 점이 좋을까?", "음식을 나누는 게 다른 사람들에게 어떤 영향을 줄 수 있을까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 먹을 때 예의를 지키는 게 왜 중요할까?", "음식을 먹을 때 예의를 지키면 어떤 점이 좋을까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 먹을 때 예의를 지키는 게 왜 중요할까?", "식사 중에 예의를 지키지 않으면 어떤 문제가 생길 수 있어?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 먹을 때 예의를 지키는 게 왜 중요할까?", "친구들이 식사 예절을 잘 지킬 때 기분이 어때?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 먹을 때 예의를 지키는 게 왜 중요할까?", "예의를 지키면서 식사하면 가족이나 친구가 어떤 반응을 보일까?", "음식", "음식.jpeg");
        createSecondQuestion("다른 나라 음식을 먹어보는 게 왜 재미있을까?", "다른 나라 음식 중에서 가장 먹어보고 싶은 게 뭐야?", "음식", "음식.jpeg");
        createSecondQuestion("다른 나라 음식을 먹어보는 게 왜 재미있을까?", "다른 나라 음식을 먹어보면 어떤 새로운 맛을 느낄 수 있어?", "음식", "음식.jpeg");
        createSecondQuestion("다른 나라 음식을 먹어보는 게 왜 재미있을까?", "다른 나라 음식을 통해 어떤 새로운 문화를 배울 수 있어?", "음식", "음식.jpeg");
        createSecondQuestion("다른 나라 음식을 먹어보는 게 왜 재미있을까?", "다른 나라 음식이랑 한국 음식의 차이점이 뭐라고 생각해?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 남기지 않고 먹는 게 왜 좋을까?", "음식을 다 먹으면 어떤 기분이 들어?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 남기지 않고 먹는 게 왜 좋을까?", "음식을 남기지 않고 먹으면 환경에 어떤 도움이 될까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 남기지 않고 먹는 게 왜 좋을까?", "음식이 남지 않게 먹으려면 어떤 방법이 좋을까?", "음식", "음식.jpeg");
        createSecondQuestion("음식을 남기지 않고 먹는 게 왜 좋을까?", "음식을 남기지 않고 다 먹으면 다른 사람들에게 어떻게 도움이 될까?", "음식", "음식.jpeg");
        createSecondQuestion("친구랑 영화를 보면 왜 더 재미있을까?", "친구와 영화를 볼 때 어떤 장면이 가장 즐거웠어?", "영화", "영화.jpeg");
        createSecondQuestion("친구랑 영화를 보면 왜 더 재미있을까?", "친구랑 함께 영화의 어떤 부분에 대해 이야기하고 싶어?", "영화", "영화.jpeg");
        createSecondQuestion("친구랑 영화를 보면 왜 더 재미있을까?", "친구와 같이 본 영화 중 기억에 남는 장면이 있어?", "영화", "영화.jpeg");
        createSecondQuestion("친구랑 영화를 보면 왜 더 재미있을까?", "친구와 영화를 볼 때 어떤 활동을 추가하면 더 재미있을까?", "영화", "영화.jpeg");
        createSecondQuestion("영화관에서 예의를 지키는 게 왜 중요할까?", "영화관에서 소리를 크게 내면 어떤 문제가 생길까?", "영화", "영화.jpeg");
        createSecondQuestion("영화관에서 예의를 지키는 게 왜 중요할까?", "영화관에서 휴대폰을 사용하면 어떤 영향을 미칠 수 있어?", "영화", "영화.jpeg");
        createSecondQuestion("영화관에서 예의를 지키는 게 왜 중요할까?", "영화관에서 다른 사람들과 조용히 해야 하는 이유는 뭐야?", "영화", "영화.jpeg");
        createSecondQuestion("영화관에서 예의를 지키는 게 왜 중요할까?", "예의를 지키면서 영화를 보면 어떤 점이 더 좋을까?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 보고 나서 친구랑 이야기하면 어떤 점이 좋을까?", "영화 보고 나서 친구랑 이야기하면서 어떤 부분이 재미있었어?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 보고 나서 친구랑 이야기하면 어떤 점이 좋을까?", "친구와 영화의 어떤 장면에 대해 의견을 나누면 좋을까?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 보고 나서 친구랑 이야기하면 어떤 점이 좋을까?", "영화 후에 친구와 이야기하면 어떤 새로운 생각을 하게 돼?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 보고 나서 친구랑 이야기하면 어떤 점이 좋을까?", "친구와 영화를 보고 나서의 감상을 나누면 어떤 기분이 들어?", "영화", "영화.jpeg");
        createSecondQuestion("다른 나라 영화를 보면 어떤 점이 재미있을까?", "다른 나라 영화에서 새로운 문화를 배우는 게 왜 흥미롭지?", "영화", "영화.jpeg");
        createSecondQuestion("다른 나라 영화를 보면 어떤 점이 재미있을까?", "다른 나라 영화를 통해 어떤 다른 생활 방식이나 전통을 알게 돼?", "영화", "영화.jpeg");
        createSecondQuestion("다른 나라 영화를 보면 어떤 점이 재미있을까?", "다른 나라 영화의 언어와 문화가 어떻게 다른지 알게 돼?", "영화", "영화.jpeg");
        createSecondQuestion("다른 나라 영화를 보면 어떤 점이 재미있을까?", "다른 나라 영화 중에서 어떤 것을 가장 보고 싶어? 왜?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 통해 배운 것을 일상에서 어떻게 사용할 수 있을까?", "영화에서 배운 교훈을 친구에게 어떻게 이야기할 수 있을까?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 통해 배운 것을 일상에서 어떻게 사용할 수 있을까?", "영화에서 본 긍정적인 행동을 일상생활에서 어떻게 실천해볼까?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 통해 배운 것을 일상에서 어떻게 사용할 수 있을까?", "영화 속 캐릭터의 행동을 본받아 어떤 것을 바꿔볼 수 있을까?", "영화", "영화.jpeg");
        createSecondQuestion("영화를 통해 배운 것을 일상에서 어떻게 사용할 수 있을까?", "영화에서 배운 점을 학교나 가정에서 어떻게 활용할 수 있을까?", "영화", "영화.jpeg");
    }

    private void createTopQuestion(String topic, String question, String difficulty) {
        TopQuestion topQuestion = TopQuestion.builder()
                .topic(topic)
                .question(question)
                .difficulty(difficulty)
                .build();
        topQuestionRepository.save(topQuestion);
    }

    private void createSecondQuestion(String topQuestionContent, String question, String topic, String imageName) {
        TopQuestion topQuestion = topQuestionRepository.findByQuestion(topQuestionContent)
                .orElseThrow(() -> new IllegalArgumentException("No TopQuestion found with question"));

        SecondQuestion secondQuestion = SecondQuestion.builder()
                .question(question)
                .topQuestion(topQuestion)
                .imageName(imageName)
                .build();
        secondQuestionRepository.save(secondQuestion);
    }
}
