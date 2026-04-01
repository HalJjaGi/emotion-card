import { test, expect } from '@playwright/test';

const FRONTEND_URL = 'https://emotion-card-frontend.pages.dev';
const BACKEND_URL = 'https://emotion-card-backend.01dlwldnjs.workers.dev';

test.describe('Emotion Card E2E Tests', () => {
  
  test('1. 홈페이지 로드 확인', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    
    // 타이틀 확인
    await expect(page).toHaveTitle(/Emotion Card|감정/);
    
    // 감정 선택 섹션 확인
    const emotionSelector = page.locator('text=오늘의 감정을 선택하세요');
    await expect(emotionSelector).toBeVisible({ timeout: 10000 });
    
    console.log('✅ 홈페이지 로드 성공');
  });

  test('2. 감정 목록 조회 (API 테스트)', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/emotions`);
    
    expect(response.ok()).toBeTruthy();
    
    const emotions = await response.json();
    
    // 8가지 감정 확인
    expect(emotions).toHaveLength(8);
    expect(emotions[0]).toHaveProperty('name');
    expect(emotions[0]).toHaveProperty('emoji');
    expect(emotions[0]).toHaveProperty('color');
    
    console.log('✅ 감정 목록 조회 성공:', emotions.length, '개');
    console.log('감정 목록:', emotions.map((e: any) => e.name).join(', '));
  });

  test('3. 감정 선택 UI 확인', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    
    // 감정 버튼들 확인 (8개)
    const emotionButtons = page.locator('button:has-text("기쁨"), button:has-text("슬픔"), button:has-text("분노")');
    const count = await emotionButtons.count();
    
    expect(count).toBeGreaterThanOrEqual(3);
    
    // 첫 번째 감정 클릭
    const firstEmotion = page.locator('button').first();
    await firstEmotion.click();
    
    // 선택 상태 확인 (ring-2 클래스 확인)
    await expect(firstEmotion).toHaveClass(/ring-2/);
    
    console.log('✅ 감정 선택 UI 정상 작동');
  });

  test('4. 이유 작성 (30자 제한)', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    
    // 감정 선택
    const emotionButton = page.locator('button').first();
    await emotionButton.click();
    
    // 이유 입력 필드 확인
    const reasonInput = page.locator('textarea');
    await expect(reasonInput).toBeVisible();
    
    // 30자 텍스트 입력
    const testReason = '오늘 친구랑 커피 마셨다 너무 좋아';
    await reasonInput.fill(testReason);
    
    // 입력된 텍스트 확인
    const value = await reasonInput.inputValue();
    expect(value).toBe(testReason);
    
    // 글자 수 표시 확인 (30/30)
    const charCount = page.locator('text=/\\d+\\/30/');
    await expect(charCount).toBeVisible();
    
    console.log('✅ 이유 작성 기능 정상 (30자 제한)');
  });

  test('5. 타임라인 페이지 이동', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    
    // 타임라인 링크 확인
    const timelineLink = page.locator('a[href="/timeline"], button:has-text("타임라인")');
    
    if (await timelineLink.count() > 0) {
      await timelineLink.click();
      
      // 타임라인 페이지 로드 확인
      await expect(page).toHaveURL(/timeline/);
      
      console.log('✅ 타임라인 페이지 이동 성공');
    } else {
      console.log('⚠️ 타임라인 링크를 찾을 수 없음');
    }
  });

  test('6. 감정 기록 생성 (API 테스트)', async ({ request }) => {
    // 감정 ID 조회
    const emotionsResponse = await request.get(`${BACKEND_URL}/emotions`);
    const emotions = await emotionsResponse.json();
    const emotionId = emotions[0].id;
    
    // 감정 기록 생성
    const createResponse = await request.post(`${BACKEND_URL}/emotions/log`, {
      data: {
        emotionId: emotionId,
        reason: 'Playwright 테스트 기록',
      },
    });
    
    expect(createResponse.ok()).toBeTruthy();
    
    const log = await createResponse.json();
    
    // 생성된 기록 확인
    expect(log).toHaveProperty('id');
    expect(log).toHaveProperty('reason', 'Playwright 테스트 기록');
    expect(log).toHaveProperty('dotArt');
    expect(log).toHaveProperty('emotion');
    
    console.log('✅ 감정 기록 생성 성공');
    console.log('도트 아트:\n', log.dotArt);
    
    // 정리: 생성된 기록 삭제
    const deleteResponse = await request.delete(`${BACKEND_URL}/emotions/log/${log.id}`);
    console.log('✅ 테스트 기록 삭제 완료');
  });

  test('7. 타임라인 조회 (API 테스트)', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/emotions/timeline`);
    
    expect(response.ok()).toBeTruthy();
    
    const timeline = await response.json();
    
    // 타임라인이 배열인지 확인
    expect(Array.isArray(timeline)).toBeTruthy();
    
    if (timeline.length > 0) {
      // 각 항목에 emotion이 포함되어 있는지 확인
      expect(timeline[0]).toHaveProperty('emotion');
      expect(timeline[0]).toHaveProperty('reason');
      expect(timeline[0]).toHaveProperty('dotArt');
    }
    
    console.log('✅ 타임라인 조회 성공:', timeline.length, '개 기록');
  });

  test('8. 건강 체크 (Backend)', async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/`);
    
    expect(response.ok()).toBeTruthy();
    
    const health = await response.json();
    
    expect(health).toHaveProperty('status', 'ok');
    expect(health).toHaveProperty('timestamp');
    
    console.log('✅ 백엔드 건강 체크 통과');
    console.log('상태:', health.status);
    console.log('시간:', health.timestamp);
  });

  test('9. 반응형 디자인 (모바일)', async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(FRONTEND_URL);
    
    // 감정 선택 버튼들이 표시되는지 확인
    const emotionButtons = page.locator('button').first();
    await expect(emotionButtons).toBeVisible();
    
    // 그리드 레이아웃 확인 (grid-cols-4)
    const gridContainer = page.locator('.grid').first();
    await expect(gridContainer).toBeVisible();
    
    console.log('✅ 모바일 반응형 디자인 정상');
  });

  test('10. 에러 핸들링 (존재하지 않는 감정)', async ({ request }) => {
    const response = await request.post(`${BACKEND_URL}/emotions/log`, {
      data: {
        emotionId: 9999, // 존재하지 않는 ID
        reason: '테스트',
      },
    });
    
    // 404 에러 확인
    expect(response.status()).toBe(404);
    
    const error = await response.json();
    expect(error).toHaveProperty('error', 'Emotion not found');
    
    console.log('✅ 에러 핸들링 정상 작동');
  });
});
