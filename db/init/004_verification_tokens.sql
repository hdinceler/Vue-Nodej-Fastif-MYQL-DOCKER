CREATE TABLE IF NOT EXISTS verification_tokens (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  contact_type ENUM('email','phone') NOT NULL,
  token VARCHAR(100) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_verify_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,

  INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
