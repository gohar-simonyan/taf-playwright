import dotenv from 'dotenv';

dotenv.config();

export const config = {
    BASE_URL: process.env.API_BASE_URL,
    TOKEN: process.env.API_TOKEN,
    PROJECT_NAME: process.env.PROJECT_NAME
};
