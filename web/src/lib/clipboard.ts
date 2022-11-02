export const clipBoard = (code: string) => {
  if (!code.length) return;

  return navigator.clipboard.writeText(code);
};
