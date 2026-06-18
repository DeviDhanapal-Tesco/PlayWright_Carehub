type EnvironmentConfig = {
  careHubTeleSalesUserName: string;
  careHubTeleSalesPassword: string;
  careHubInStoreUserName: string;
  careHubInStorePassword: string;
};

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is required. Set it in .env locally or as a GitHub Secret in CI.`);
  }
  return value;
};

export const Environment: EnvironmentConfig = {
  careHubTeleSalesUserName: required('CAREHUB_TELESALES_USERNAME'),
  careHubTeleSalesPassword: required('CAREHUB_TELESALES_PASSWORD'),
  careHubInStoreUserName: required('CAREHUB_INSTORE_USERNAME'),
  careHubInStorePassword: required('CAREHUB_INSTORE_PASSWORD'),
};
