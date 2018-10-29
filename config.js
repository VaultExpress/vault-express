module.exports = {
  username_min_length: 6,
  username_max_length: 30,
  password_min_length: 7,
  password_max_length: 30,
  password_hash_salt_rounds: 12,
  session_secret: 'vaUltexpRess',

  msg_auth_found_error: 'Found error', // used in auth/local.js
  msg_auth_invalid_username: 'Invalid Username or password', // used in auth/local.js
  msg_auth_invalid_password: 'Invalid username or Password', // used in auth/local.js
  msg_auth_passport_login_error: 'Found error', // used in auth/index.js

  pg_tablename_prefix: 've_',
};
