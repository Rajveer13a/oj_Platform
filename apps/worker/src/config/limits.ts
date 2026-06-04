export const LANGUAGE_LIMITS = {
  python: {
    image:  "python:3.12-slim",
    cmd:    ["python", "solution.py"],
    ext:    "py",
  },
  javascript: {
    image:  "node:20-slim",
    cmd:    ["node", "solution.js"],
    ext:    "js",
  }
} as const;

export type supportedLanguage = keyof typeof LANGUAGE_LIMITS; 