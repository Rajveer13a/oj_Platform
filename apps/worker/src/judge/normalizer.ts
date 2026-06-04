export const normalize = (output: string): string => {
  return output
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n+$/, "");
};
