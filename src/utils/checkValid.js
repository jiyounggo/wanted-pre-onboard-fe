const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const checkEmail = (email) => {
  return email.match(regexp);
};

const checkPassword = (password) => {
  return password.length >= 8;
};

export { checkEmail, checkPassword };
