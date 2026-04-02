# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emotion-card.spec.ts >> Emotion Card E2E Tests >> 3. 감정 선택 UI 확인
- Location: tests/emotion-card.spec.ts:38:7

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 3
Received:    0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]: 로딩 중...
  - alert [ref=e4]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const FRONTEND_URL = 'https://emotion-card-frontend.pages.dev';
  4   | const BACKEND_URL = 'https://emotion-card-backend.01dlwldnjs.workers.dev';
  5   | 
  6   | test.describe('Emotion Card E2E Tests', () => {
  7   |   
  8   |   test('1. 홈페이지 로드 확인', async ({ page }) => {
  9   |     await page.goto(FRONTEND_URL);
  10  |     
  11  |     // 타이틀 확인
  12  |     await expect(page).toHaveTitle(/Emotion Card|감정/);
  13  |     
  14  |     // 감정 선택 섹션 확인
  15  |     const emotionSelector = page.locator('text=오늘의 감정을 선택하세요');
  16  |     await expect(emotionSelector).toBeVisible({ timeout: 10000 });
  17  |     
  18  |     console.log('✅ 홈페이지 로드 성공');
  19  |   });
  20  | 
  21  |   test('2. 감정 목록 조회 (API 테스트)', async ({ request }) => {
  22  |     const response = await request.get(`${BACKEND_URL}/emotions`);
  23  |     
  24  |     expect(response.ok()).toBeTruthy();
  25  |     
  26  |     const emotions = await response.json();
  27  |     
  28  |     // 8가지 감정 확인
  29  |     expect(emotions).toHaveLength(8);
  30  |     expect(emotions[0]).toHaveProperty('name');
  31  |     expect(emotions[0]).toHaveProperty('emoji');
  32  |     expect(emotions[0]).toHaveProperty('color');
  33  |     
  34  |     console.log('✅ 감정 목록 조회 성공:', emotions.length, '개');
  35  |     console.log('감정 목록:', emotions.map((e: any) => e.name).join(', '));
  36  |   });
  37  | 
  38  |   test('3. 감정 선택 UI 확인', async ({ page }) => {
  39  |     await page.goto(FRONTEND_URL);
  40  |     
  41  |     // 감정 버튼들 확인 (8개)
  42  |     const emotionButtons = page.locator('button:has-text("기쁨"), button:has-text("슬픔"), button:has-text("분노")');
  43  |     const count = await emotionButtons.count();
  44  |     
> 45  |     expect(count).toBeGreaterThanOrEqual(3);
      |                   ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  46  |     
  47  |     // 첫 번째 감정 클릭
  48  |     const firstEmotion = page.locator('button').first();
  49  |     await firstEmotion.click();
  50  |     
  51  |     // 선택 상태 확인 (ring-2 클래스 확인)
  52  |     await expect(firstEmotion).toHaveClass(/ring-2/);
  53  |     
  54  |     console.log('✅ 감정 선택 UI 정상 작동');
  55  |   });
  56  | 
  57  |   test('4. 이유 작성 (30자 제한)', async ({ page }) => {
  58  |     await page.goto(FRONTEND_URL);
  59  |     
  60  |     // 로딩 완료 대기
  61  |     await expect(page.locator('text=오늘의 감정')).toBeVisible({ timeout: 10000 });
  62  |     
  63  |     // 감정 선택
  64  |     const emotionButton = page.locator('button:has-text("기쁨"), button:has-text("슬픔")').first();
  65  |     await emotionButton.click();
  66  |     
  67  |     // 이유 입력 필드 확인
  68  |     const reasonInput = page.locator('textarea');
  69  |     await expect(reasonInput).toBeVisible();
  70  |     
  71  |     // 30자 텍스트 입력
  72  |     const testReason = '오늘 친구랑 커피 마셨다 너무 좋아';
  73  |     await reasonInput.fill(testReason);
  74  |     
  75  |     // 입력된 텍스트 확인
  76  |     const value = await reasonInput.inputValue();
  77  |     expect(value).toBe(testReason);
  78  |     
  79  |     // 글자 수 표시 확인 (30/30)
  80  |     const charCount = page.locator('text=/\\d+\\/30/');
  81  |     await expect(charCount).toBeVisible();
  82  |     
  83  |     console.log('✅ 이유 작성 기능 정상 (30자 제한)');
  84  |   });
  85  | 
  86  |   test('5. 타임라인 페이지 이동', async ({ page }) => {
  87  |     await page.goto(FRONTEND_URL);
  88  |     
  89  |     // 타임라인 링크 확인
  90  |     const timelineLink = page.locator('a[href="/timeline"], button:has-text("타임라인")');
  91  |     
  92  |     if (await timelineLink.count() > 0) {
  93  |       await timelineLink.click();
  94  |       
  95  |       // 타임라인 페이지 로드 확인
  96  |       await expect(page).toHaveURL(/timeline/);
  97  |       
  98  |       console.log('✅ 타임라인 페이지 이동 성공');
  99  |     } else {
  100 |       console.log('⚠️ 타임라인 링크를 찾을 수 없음');
  101 |     }
  102 |   });
  103 | 
  104 |   test('6. 감정 기록 생성 (API 테스트)', async ({ request }) => {
  105 |     // 감정 ID 조회
  106 |     const emotionsResponse = await request.get(`${BACKEND_URL}/emotions`);
  107 |     const emotions = await emotionsResponse.json();
  108 |     const emotionId = emotions[0].id;
  109 |     
  110 |     // 감정 기록 생성
  111 |     const createResponse = await request.post(`${BACKEND_URL}/emotions/log`, {
  112 |       data: {
  113 |         emotionId: emotionId,
  114 |         reason: 'Playwright 테스트 기록',
  115 |       },
  116 |     });
  117 |     
  118 |     expect(createResponse.ok()).toBeTruthy();
  119 |     
  120 |     const log = await createResponse.json();
  121 |     
  122 |     // 생성된 기록 확인
  123 |     expect(log).toHaveProperty('id');
  124 |     expect(log).toHaveProperty('reason', 'Playwright 테스트 기록');
  125 |     expect(log).toHaveProperty('dotArt');
  126 |     expect(log).toHaveProperty('emotion');
  127 |     
  128 |     console.log('✅ 감정 기록 생성 성공');
  129 |     console.log('도트 아트:\n', log.dotArt);
  130 |     
  131 |     // 정리: 생성된 기록 삭제
  132 |     const deleteResponse = await request.delete(`${BACKEND_URL}/emotions/log/${log.id}`);
  133 |     console.log('✅ 테스트 기록 삭제 완료');
  134 |   });
  135 | 
  136 |   test('7. 타임라인 조회 (API 테스트)', async ({ request }) => {
  137 |     const response = await request.get(`${BACKEND_URL}/emotions/timeline`);
  138 |     
  139 |     expect(response.ok()).toBeTruthy();
  140 |     
  141 |     const timeline = await response.json();
  142 |     
  143 |     // 타임라인이 배열인지 확인
  144 |     expect(Array.isArray(timeline)).toBeTruthy();
  145 |     
```