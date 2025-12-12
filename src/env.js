const env = {
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    name: process.env.NEXT_PUBLIC_APPWRITE_NAME,
    apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY,
  },
};

export default env;
