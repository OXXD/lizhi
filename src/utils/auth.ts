export const TOKEN_KEY = 'token';

export const getUserToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setUserToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeUserToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
