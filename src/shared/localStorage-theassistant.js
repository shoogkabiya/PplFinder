export const GetItem = (key) => {
  return window && window.localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

export const SetItem = (key, value) => {
  if (window) window.localStorage.setItem(key, JSON.stringify(value));
};
