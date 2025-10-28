import dotenv from 'dotenv';

dotenv.config();

const Config = {
  serverName: process.env.SERVER_NAME,
  serverPort: Number(process.env.PORT) ?? 3200,
  environment: process.env.SERVER_ENVIRONMENT as string,
};

export default Config;
