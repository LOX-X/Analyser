
const getLocalStorage = (key:string): string | null => {
  return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value:any | null) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

export { getLocalStorage, setLocalStorage };
