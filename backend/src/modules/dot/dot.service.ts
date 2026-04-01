import { Injectable } from '@nestjs/common';

@Injectable()
export class DotService {
  /**
   * 8x8 그리드 도트 아트 생성
   * @param basePattern 기본 패턴 (8x8 이차원 배열)
   * @param variationAmount 변형 정도 (0.0 ~ 1.0, 기본값: 0.3)
   * @returns ASCII art 문자열
   */
  generateDot(basePattern: number[][], variationAmount = 0.3): string {
    // 기본 패턴이 없으면 빈 패턴 생성
    if (!basePattern || basePattern.length === 0) {
      basePattern = this.createEmptyPattern();
    }

    // 랜덤 변형 적용
    const variedPattern = this.applyVariation(basePattern, variationAmount);

    // ASCII art로 변환
    return this.patternToAscii(variedPattern);
  }

  /**
   * 빈 8x8 패턴 생성
   */
  private createEmptyPattern(): number[][] {
    return Array(8)
      .fill(null)
      .map(() => Array(8).fill(0));
  }

  /**
   * 랜덤 변형 적용
   */
  private applyVariation(
    pattern: number[][],
    variationAmount: number,
  ): number[][] {
    const result = pattern.map((row) => [...row]);

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Math.random() < variationAmount) {
          // 50% 확률로 반전
          if (Math.random() < 0.5) {
            result[i][j] = pattern[i][j] === 1 ? 0 : 1;
          }
        }
      }
    }

    return result;
  }

  /**
   * 패턴을 ASCII art로 변환
   */
  private patternToAscii(pattern: number[][]): string {
    return pattern
      .map((row) => row.map((cell) => (cell === 1 ? '●' : '○')).join(' '))
      .join('\n');
  }

  /**
   * 특정 감정에 대한 도트 생성 (간단한 버전)
   */
  generateEmotionDot(emotionName: string): string {
    const patterns: Record<string, number[][]> = {
      기쁨: [
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ],
      슬픔: [
        [0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
      ],
    };

    const pattern = patterns[emotionName] || this.createEmptyPattern();
    return this.generateDot(pattern);
  }
}
