CREATE TABLE IF NOT EXISTS user_profiles (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  birth_date DATE NULL,
  gender ENUM('male','female','other') NULL,
  grade TINYINT NULL COMMENT 'LGS için sınıf (7-8)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_profile_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
