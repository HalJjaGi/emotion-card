# Emotion Card 🎨

감정을 기록하고 도트 아트로 시각화하는 웹 애플리케이션

## 프로젝트 개요

Emotion Card는 사용자가 매일의 감정을 기록하고, 그 감정을 독특한 8x8 도트 아트로 시각화하여 타임라인에서 확인할 수 있는 서비스입니다.

### 핵심 기능

- ✨ **8가지 감정 선택**: 기쁨, 슬픔, 분노, 불안, 평온, 설렘, 피곤, 무기력
- 🎨 **도트 아트 자동 생성**: 감정별 고유 패턴 + 랜덤 변형
- 📝 **30자 이유 작성**: 간단하고 스트레스 없는 기록
- 📅 **타임라인 뷰**: 감정 카드 피드 형태로 확인

## 기술 스택

### Backend
- **Framework**: NestJS 10
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL 15
- **ORM**: TypeORM
- **Language**: TypeScript

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **Language**: TypeScript

## 프로젝트 구조

```
emotion-card/
├── backend/              # NestJS 백엔드
│   ├── src/
│   │   ├── database/     # 엔티티, 마이그레이션, 시드
│   │   ├── modules/      # 기능 모듈
│   │   ├── config/       # 설정
│   │   └── common/       # 공통 유틸리티
│   ├── package.json
│   └── .env.example
├── frontend/             # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/          # 페이지 (App Router)
│   │   ├── components/   # React 컴포넌트
│   │   ├── hooks/        # 커스텀 훅
│   │   ├── lib/          # 유틸리티
│   │   └── types/        # TypeScript 타입
│   ├── package.json
│   └── .env.example
└── README.md
```

## 시작하기

### 사전 요구사항

- Node.js 18+
- PostgreSQL 15+
- npm 또는 yarn

### 설치 및 실행

#### 1. 저장소 클론

```bash
cd emotion-card
```

#### 2. 데이터베이스 설정

PostgreSQL에서 데이터베이스를 생성합니다:

```sql
CREATE DATABASE emotion_card;
```

#### 3. 백엔드 설정

```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 데이터베이스 정보를 수정하세요

# 개발 서버 실행
npm run start:dev
```

백엔드는 기본적으로 `http://localhost:3000`에서 실행됩니다.

#### 4. 프론트엔드 설정

```bash
cd ../frontend

# 의존성 설치
npm install

# 환경 변수 설정 (필요시)
# .env.local 파일을 생성하고 NEXT_PUBLIC_API_URL을 설정

# 개발 서버 실행
npm run dev
```

프론트엔드는 기본적으로 `http://localhost:3001`에서 실행됩니다.

### 환경 변수

#### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=emotion_card

# Server
PORT=3000
NODE_ENV=development
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## API 문서

### Emotions API

- `GET /emotions` - 모든 감정 목록 조회
- `GET /emotions/:id` - 특정 감정 조회

### Emotion Log API

- `POST /emotion-log` - 감정 기록 생성
- `GET /emotion-log/timeline?userId=xxx&page=1&limit=10` - 타임라인 조회
- `GET /emotion-log/:id` - 특정 기록 조회
- `DELETE /emotion-log/:id` - 기록 삭제

### Dot API

- `POST /dot/generate` - 도트 아트 생성

## 개발 노트

### MVP 단순화 전략

1. **인증 없이 시작**: localStorage에 임시 사용자 ID 저장
2. **Redis 캐싱 제외**: 초기에는 불필요
3. **AWS 배포 제외**: 로컬 개발 환경 우선

### 도트 생성 알고리즘

- 8x8 그리드 (64개 도트)
- 감정별 고유 기본 패턴
- 30% 랜덤 변형으로 매번 다른 도트 생성
- ASCII art로 표현 (●: 활성, ○: 비활성)

### 추후 개선 사항

- [ ] 인증 시스템 추가 (JWT)
- [ ] 캘린더 뷰 구현
- [ ] 감정 통계 차트
- [ ] 소셜 기능 (공유, 친구)
- [ ] PWA 지원
- [ ] 다크 모드
- [ ] 다국어 지원 (i18n)

## 라이선스

MIT

---

Made with ❤️ by Emotion Card Team
