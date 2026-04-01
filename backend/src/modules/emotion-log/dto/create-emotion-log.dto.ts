import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateEmotionLogDto {
  @IsUUID()
  emotionId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  reason: string;

  @IsUUID()
  userId: string;
}
