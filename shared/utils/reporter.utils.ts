import { step } from 'allure-js-commons';

export const logError = async (log: string, error?: Error): Promise<void> => {
  const errorMessage = error ? `${log} - Error: ${error.message}` : log;
  await step(`ERROR || ${errorMessage}`, () => {
    console.error(`ERROR || ${errorMessage}`);
  });
};

export const logStep = async (message: string) => {
  await step(`STEP || ${message}`, () => {
    console.log(`STEP || ${message}`);
  });
};

export const reportApiError = async (error: unknown, operation: string): Promise<never> => {
  const err = error instanceof Error ? error : new Error(String(error));
  await logError(`${operation} Error:`, err);
  throw error;
};

export default {
  logStep,
  logError,
  reportApiError,
};
