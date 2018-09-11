CREATE TABLE ve_users (
  id            VARCHAR(36) PRIMARY KEY,
  username      VARCHAR(15) NOT NULL,
  password      VARCHAR(60) NOT NULL,
  provider      VARCHAR(20) NOT NULL,
  display_name  VARCHAR(50) NULL,
  given_name    VARCHAR(30) NULL,
  middle_name   VARCHAR(30) NULL,
  family_name   VARCHAR(30) NULL,
  info1         VARCHAR(100) NULL,
  info2         VARCHAR(100) NULL,
  info3         VARCHAR(100) NULL,
  info4         VARCHAR(100) NULL,
  info5         VARCHAR(100) NULL,
);

CREATE TABLE ve_emails (
  id            SERIAL  PRIMARY KEY,
  email_type    VARCHAR(20) NOT NULL,
  email_address VARCHAR(254) NOT NULL,
  user_id       VARCHAR(36) NOT NULL REFERENCES users
);

CREATE TABLE ve_photos (
  id            SERIAL  PRIMARY KEY,
  photo_type    VARCHAR(20) NOT NULL,
  photo_url     VARCHAR(2000) NOT NULL,
  user_id       VARCHAR(36) NOT NULL REFERENCES users
);
