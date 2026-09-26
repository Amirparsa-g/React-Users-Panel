export const isValidName = (name: string | undefined) => {
  if (!name) return false;
  return name.trim().length >= 3;
};
