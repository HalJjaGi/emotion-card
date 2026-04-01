-- CreateTable
CREATE TABLE `emotions` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` TEXT NOT NULL,
    `emoji` TEXT NOT NULL,
    `color` TEXT NOT NULL,
    `created_at` INTEGER DEFAULT (unixepoch()) NOT NULL
);

-- CreateTable
CREATE TABLE `emotion_logs` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `emotion_id` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `dot_art` TEXT NOT NULL,
    `created_at` INTEGER DEFAULT (unixepoch()) NOT NULL,
    CONSTRAINT `emotion_logs_emotion_id_emotions_id` FOREIGN KEY (`emotion_id`) REFERENCES `emotions`(`id`) ON UPDATE no action ON DELETE no action
);

-- CreateIndex
CREATE INDEX `emotion_logs_emotion_id_idx` ON `emotion_logs`(`emotion_id`);

-- CreateIndex
CREATE INDEX `emotion_logs_created_at_idx` ON `emotion_logs`(`created_at`);

-- SeedData
INSERT INTO emotions (name, emoji, color) VALUES
  ('기쁨', '😊', '#FFD93D'),
  ('슬픔', '😢', '#6BCB77'),
  ('분노', '😠', '#FF6B6B'),
  ('불안', '😰', '#4D96FF'),
  ('평온', '😌', '#C9B1FF'),
  ('설렘', '🤗', '#FF8FAB'),
  ('피곤', '😫', '#B8B5FF'),
  ('무기력', '😶', '#95E1D3');
