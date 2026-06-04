import "dotenv/config";
import { submissionWorker } from "./workers/submission.worker.js";


console.log('worker started, waiting for jobs...');

process.on('SIGTERM', async () => {
  await submissionWorker.close();
  process.exit(0);
});