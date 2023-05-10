export const convertObjectToString = (obj: Object): string => {
  return Object.values(obj).reduce((str, cur) => {
    return (
      str + ', ' + (typeof cur === 'object' ? +convertObjectToString(cur) : cur)
    );
  }, '');
};
