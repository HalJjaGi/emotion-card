# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emotion-card.spec.ts >> Emotion Card E2E Tests >> 6. 감정 기록 생성 (API 테스트)
- Location: tests/emotion-card.spec.ts:101:7

# Error details

```
TypeError: Cannot read properties of undefined (reading 'id')
```

# Test source

```ts
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
  45  |     expect(count).toBeGreaterThanOrEqual(3);
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
  60  |     // 감정 선택
  61  |     const emotionButton = page.locator('button').first();
  62  |     await emotionButton.click();
  63  |     
  64  |     // 이유 입력 필드 확인
  65  |     const reasonInput = page.locator('textarea');
  66  |     await expect(reasonInput).toBeVisible();
  67  |     
  68  |     // 30자 텍스트 입력
  69  |     const testReason = '오늘 친구랑 커피 마셨다 너무 좋아';
  70  |     await reasonInput.fill(testReason);
  71  |     
  72  |     // 입력된 텍스트 확인
  73  |     const value = await reasonInput.inputValue();
  74  |     expect(value).toBe(testReason);
  75  |     
  76  |     // 글자 수 표시 확인 (30/30)
  77  |     const charCount = page.locator('text=/\\d+\\/30/');
  78  |     await expect(charCount).toBeVisible();
  79  |     
  80  |     console.log('✅ 이유 작성 기능 정상 (30자 제한)');
  81  |   });
  82  | 
  83  |   test('5. 타임라인 페이지 이동', async ({ page }) => {
  84  |     await page.goto(FRONTEND_URL);
  85  |     
  86  |     // 타임라인 링크 확인
  87  |     const timelineLink = page.locator('a[href="/timeline"], button:has-text("타임라인")');
  88  |     
  89  |     if (await timelineLink.count() > 0) {
  90  |       await timelineLink.click();
  91  |       
  92  |       // 타임라인 페이지 로드 확인
  93  |       await expect(page).toHaveURL(/timeline/);
  94  |       
  95  |       console.log('✅ 타임라인 페이지 이동 성공');
  96  |     } else {
  97  |       console.log('⚠️ 타임라인 링크를 찾을 수 없음');
  98  |     }
  99  |   });
  100 | 
  101 |   test('6. 감정 기록 생성 (API 테스트)', async ({ request }) => {
  102 |     // 감정 ID 조회
  103 |     const emotionsResponse = await request.get(`${BACKEND_URL}/emotions`);
  104 |     const emotions = await emotionsResponse.json();
> 105 |     const emotionId = emotions[0].id;
      |                                   ^ TypeError: Cannot read properties of undefined (reading 'id')
  106 |     
  107 |     // 감정 기록 생성
  108 |     const createResponse = await request.post(`${BACKEND_URL}/emotions/log`, {
  109 |       data: {
  110 |         emotionId: emotionId,
  111 |         reason: 'Playwright 테스트 기록',
  112 |       },
  113 |     });
  114 |     
  115 |     expect(createResponse.ok()).toBeTruthy();
  116 |     
  117 |     const log = await createResponse.json();
  118 |     
  119 |     // 생성된 기록 확인
  120 |     expect(log).toHaveProperty('id');
  121 |     expect(log).toHaveProperty('reason', 'Playwright 테스트 기록');
  122 |     expect(log).toHaveProperty('dotArt');
  123 |     expect(log).toHaveProperty('emotion');
  124 |     
  125 |     console.log('✅ 감정 기록 생성 성공');
  126 |     console.log('도트 아트:\n', log.dotArt);
  127 |     
  128 |     // 정리: 생성된 기록 삭제
  129 |     const deleteResponse = await request.delete(`${BACKEND_URL}/emotions/log/${log.id}`);
  130 |     console.log('✅ 테스트 기록 삭제 완료');
  131 |   });
  132 | 
  133 |   test('7. 타임라인 조회 (API 테스트)', async ({ request }) => {
  134 |     const response = await request.get(`${BACKEND_URL}/emotions/timeline`);
  135 |     
  136 |     expect(response.ok()).toBeTruthy();
  137 |     
  138 |     const timeline = await response.json();
  139 |     
  140 |     // 타임라인이 배열인지 확인
  141 |     expect(Array.isArray(timeline)).toBeTruthy();
  142 |     
  143 |     if (timeline.length > 0) {
  144 |       // 각 항목에 emotion이 포함되어 있는지 확인
  145 |       expect(timeline[0]).toHaveProperty('emotion');
  146 |       expect(timeline[0]).toHaveProperty('reason');
  147 |       expect(timeline[0]).toHaveProperty('dotArt');
  148 |     }
  149 |     
  150 |     console.log('✅ 타임라인 조회 성공:', timeline.length, '개 기록');
  151 |   });
  152 | 
  153 |   test('8. 건강 체크 (Backend)', async ({ request }) => {
  154 |     const response = await request.get(`${BACKEND_URL}/`);
  155 |     
  156 |     expect(response.ok()).toBeTruthy();
  157 |     
  158 |     const health = await response.json();
  159 |     
  160 |     expect(health).toHaveProperty('status', 'ok');
  161 |     expect(health).toHaveProperty('timestamp');
  162 |     
  163 |     console.log('✅ 백엔드 건강 체크 통과');
  164 |     console.log('상태:', health.status);
  165 |     console.log('시간:', health.timestamp);
  166 |   });
  167 | 
  168 |   test('9. 반응형 디자인 (모바일)', async ({ page }) => {
  169 |     // 모바일 뷰포트로 설정
  170 |     await page.setViewportSize({ width: 375, height: 667 });
  171 |     
  172 |     await page.goto(FRONTEND_URL);
  173 |     
  174 |     // 감정 선택 버튼들이 표시되는지 확인
  175 |     const emotionButtons = page.locator('button').first();
  176 |     await expect(emotionButtons).toBeVisible();
  177 |     
  178 |     // 그리드 레이아웃 확인 (grid-cols-4)
  179 |     const gridContainer = page.locator('.grid').first();
  180 |     await expect(gridContainer).toBeVisible();
  181 |     
  182 |     console.log('✅ 모바일 반응형 디자인 정상');
  183 |   });
  184 | 
  185 |   test('10. 에러 핸들링 (존재하지 않는 감정)', async ({ request }) => {
  186 |     const response = await request.post(`${BACKEND_URL}/emotions/log`, {
  187 |       data: {
  188 |         emotionId: 9999, // 존재하지 않는 ID
  189 |         reason: '테스트',
  190 |       },
  191 |     });
  192 |     
  193 |     // 404 에러 확인
  194 |     expect(response.status()).toBe(404);
  195 |     
  196 |     const error = await response.json();
  197 |     expect(error).toHaveProperty('error', 'Emotion not found');
  198 |     
  199 |     console.log('✅ 에러 핸들링 정상 작동');
  200 |   });
  201 | });
  202 | 
```