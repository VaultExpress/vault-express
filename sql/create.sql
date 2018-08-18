CREATE TABLE users (
  user_id       serial      PRIMARY KEY,
  username      varchar(50) NOT NULL,
  password      varchar(50) NOT NULL,
  email         varchar(50) NOT NULL,
  displayname   varchar(50) NULL,
  profileimage  varchar(50) NULL,
  info1         varchar(50) NULL,
  info2         varchar(50) NULL,
  info3         varchar(50) NULL,
  info4         varchar(50) NULL,
  info5         varchar(50) NULL,
);
