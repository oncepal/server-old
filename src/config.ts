import dotenv from 'dotenv';

dotenv?.config(); // 将.env中配置的环境变量读取到process.env中，https://github.com/motdotla/dotenv

const config = {
  db: {
    url: process.env.MONGO_DB_URL,
    name: process.env.DB_NAME,
  },
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  mode: {
    DEBUG: process.env.NODE_ENV === 'development',
    MOCK: true,
  },
};

export default config;
