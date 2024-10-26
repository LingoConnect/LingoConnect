# 🗣️ 링고커넥트 (LingoConnect)

![링고커넥트1](./images/img1.png)

## 🔥 프로젝트 소개

- 언어학습을 통해 지적장애인이 더 넓은 세상과 소통할 수 있도록 도와주는 서비스입니다.
- 생성형 AI를 통해 현실감 있는 음성 대화가 가능하며, 대화 흐름과 발음에 대한 분석과 피드백을 제공합니다.
- 학습자에게 맞춤형으로 반복 학습을 지원하여 사회적인 소통 능력을 키우는 것을 목표로 합니다.
  <br></br>

## 🌟 생성형 AI 활용 서비스

- 일상 대화와 공감형 대화 데이터를 학습한 생성형 AI를 사용합니다.
- 학습자의 음성을 텍스트로 인식하여 현실에 적용하기 쉬운 환경을 제공합니다.
- 대화의 흐름뿐만 아니라 발음에 점수를 매겨 시각적으로 성취를 이룰 수 있습니다.
- 마이페이지에서 학습자의 반복되는 부정적인 대화 패턴과 피드백을 제공합니다.

![링고커넥트2](./images/img2.png)
<br></br>

## 🚀 개발 기간

- 2024.07 - 2024.08
  <br></br>

## 👨‍👩‍👧‍👦 팀원 구성

- 이예나 | Front-End | [@YenaLey](https://github.com/YenaLey)
- 주재원 | Back-End | [@jaewon-Ju](https://github.com/jaewon-ju)
- 김예영 | Front-End | [@yezzero](https://github.com/yezzero)
- 정윤하 | Design
  <br></br>

## 💻 기술 스택

- Design
  - <a href="https://www.figma.com/design/gqZCozFYBEP1Yu1ThoLvMm/%EC%83%88%EC%8B%B9%ED%95%B4%EC%BB%A4%ED%86%A4?node-id=0-1&t=rPEXG1J575Ev7A3j-1">figma</a>
- Front-End
  - Language: JavaScript
  - Package Manager: npm 10.2.4
  - Library: React.js
- Back-End
  - Language: Java
  - Framework: Spring
    <br></br>

## ⚙️ 브랜치 전략

1. **기능 개발**: `feature/` 브랜치에서 새로운 기능을 개발합니다. `release` 브랜치에서 분기하여 작업 후, `release` 브랜치로 병합합니다.
2. **버그 수정 및 릴리스 준비**: `release` 브랜치에서 검토 후 `main` 브랜치에 병합합니다.

## 🎥 Frontend local

### 프로젝트 가져오기

```
git clone https://github.com/LingoConnect/LingoConnect.git
cd LingoConnect
cd frontend
```

### forntend 디렉토리 최상단에 `.env` 파일 생성

```
NODE_ENV : 개발 환경을 지정합니다.
REACT_APP_BASE_URL : API 서버의 기본 URL을 설정합니다
```

### 프로젝트 실행

```
npm install
npm start
```

## ⏳ CI/CD Pipeline

이 프로젝트는 GitHub Actions를 사용하여 CI/CD 파이프라인을 자동화합니다. 파이프라인은 백엔드와 프론트엔드로 나누어져 있습니다.

### Backend

1. **Build**: Gradle을 사용하여 백엔드를 빌드합니다.
2. **Test**: 빌드 후 Gradle을 사용하여 백엔드 테스트를 실행합니다.
3. **Deploy**: Docker Compose를 사용하여 백엔드 애플리케이션을 빌드하고 실행합니다.

### Frontend

1. **Build**: Node.js와 npm을 사용하여 프론트엔드를 빌드합니다.
2. **Deploy**: 빌드된 프론트엔드를 GitHub Pages에 배포합니다.
