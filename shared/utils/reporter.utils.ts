import { step } from 'allure-js-commons';

export const logError = (log: string, error?: Error): void => {
  const errorMessage = error ? `${log} - Error: ${error.message}` : log;
  step(`ERROR || ${errorMessage}`, async () => {});
  console.error(`ERROR || ${errorMessage}`);
};

export const logStep = async (message: string): Promise<void> => {
  await step(`STEP || ${message}`, async () => {
    console.log(`STEP || ${message}`);
  });
};

export const reportApiError = (error: unknown, operation: string): never => {
  const err = error instanceof Error ? error : new Error(String(error));
  logError(`${operation} Error:`, err);
  throw error;
};

export default {
  logStep,
  logError,
  reportApiError,
};
