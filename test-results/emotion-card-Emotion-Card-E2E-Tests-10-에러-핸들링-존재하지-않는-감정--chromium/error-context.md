# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: emotion-card.spec.ts >> Emotion Card E2E Tests >> 10. 에러 핸들링 (존재하지 않는 감정)
- Location: tests/emotion-card.spec.ts:185:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 500
```

# Test source

```ts
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
  105 |     const emotionId = emotions[0].id;
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
> 194 |     expect(response.status()).toBe(404);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  195 |     
  196 |     const error = await response.json();
  197 |     expect(error).toHaveProperty('error', 'Emotion not found');
  198 |     
  199 |     console.log('✅ 에러 핸들링 정상 작동');
  200 |   });
  201 | });
  202 | 
```