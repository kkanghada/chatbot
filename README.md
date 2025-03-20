# 🎙️ 복지 정보 챗봇

음성 및 텍스트 입력을 지원하는 한국어 복지 정보 챗봇입니다. Next.js로 구현되어 있으며, Vercel에 간편하게 배포할 수 있습니다.

## 📋 주요 기능

- 🎤 **음성 입력**: Web Speech API를 활용한 한국어 음성 인식
- ⌨️ **텍스트 입력**: 일반 텍스트 입력 지원
- 🏛️ **복지 정보 제공**: 기본적인 복지 정보 응답 (추후 공공 API 연동 확장 가능)
- 🔊 **음성 출력**: TTS API를 활용한 음성 답변
- 🚀 **서버리스 백엔드**: Vercel API Routes 활용

## 🚀 로컬 환경에서 실행하기

```bash
# 의존성 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 🌐 Vercel에 배포하기

1. GitHub에 프로젝트를 Push합니다.
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [YOUR_GITHUB_REPO_URL]
git push -u origin main
```

2. [Vercel](https://vercel.com)에 로그인하고 GitHub 저장소를 연결합니다.

3. 또는 Vercel CLI를 사용하여 배포할 수 있습니다:
```bash
# Vercel CLI 설치
npm install -g vercel

# Vercel 로그인
vercel login

# 배포
vercel deploy
```

## 📝 커스터마이징

### 공공 API 연동하기

실제 공공 API를 연동하려면 `pages/api/chatbot.js` 파일에서 주석 처리된 API 호출 부분을 수정하세요. 
실제 공공 API 키는 환경변수로 관리하는 것이 좋습니다.

```javascript
// .env.local 파일에 API 키 추가
// PUBLIC_API_KEY=your_api_key_here

// pages/api/chatbot.js에서 주석 해제하고 실제 API URL로 교체
const API_KEY = process.env.PUBLIC_API_KEY;
const API_URL = `https://실제API주소.go.kr/api?query=${encodeURIComponent(message)}&apiKey=${API_KEY}`;
```

## 👩‍💻 기술 스택

- **프론트엔드**: React, Next.js
- **백엔드**: Next.js API Routes (서버리스)
- **음성 인식**: Web Speech API
- **음성 합성**: SpeechSynthesis API
- **배포**: Vercel

## 📄 라이센스

MIT 