import fs from "fs/promises";
import path from "path";
import os, { tmpdir } from "os";
import { spawn } from "child_process";

export interface SandboxResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  timedOut: boolean;
  runtime: number;
}

export const runInSandbox = async (
  code: string,
  input: string,
  language: string,
  image: string,
  cmd: string[],
  ext: string,
  timeLimit: number,
  memoryLimit: number,
): Promise<SandboxResult> => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "oj-"));

  const fileName = `solution.${ext}`;

  await fs.writeFile(path.join(tempDir, fileName), code);

  const dockerArgs = [
    "run",
    "--rm",
    "-i",
    "--network",
    "none",
    "--read-only",
    "--tmpfs",
    "/tmp:size=10m,noexec",
    "--memory",
    `${memoryLimit}m`,
    "--memory-swap",
    `${memoryLimit}m`,
    "--cpus",
    "0.5",
    "--pids-limit",
    "50",
    "--cap-drop",
    "ALL",
    "--security-opt",
    "no-new-privileges",
    "--user",
    "1000:1000",
    "-v",
    `${tempDir}:/sandbox:ro`,
    "-w",
    "/sandbox",
    image,
    ...cmd,
  ];

  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const start = Date.now();

    const proc = spawn("docker", dockerArgs);

    proc.stdin.write(input);
    proc.stdin.end();

    proc.stdout.on("data", (data) => (stdout += data.toString()));
    proc.stderr.on("data", (data) => (stderr += data.toString()));

    const timer = setTimeout(() => {
      timedOut = true;
      proc.kill("SIGKILL");
    }, timeLimit * 1000);

    proc.on("close", async(exitCode) => {
        clearTimeout(timer);
        const runtime = Date.now() - start;
        await fs.rm(tempDir,{recursive: true, force: true});
         
        resolve({
            stdout: stdout.trim(),
            stderr: stderr.trim(),
            exitCode: exitCode ?? 1,
            timedOut,
            runtime
        });

    });

  });

};
