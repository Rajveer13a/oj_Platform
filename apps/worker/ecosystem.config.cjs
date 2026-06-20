module.exports = {
  apps: [
    {
      name: "brainyalgo_worker",
      cwd: "./apps/worker",
      script: "./src/index.ts",
      interpreter: "npx",
      interpreter_args: "tsx",
    },
  ],
};