import { EnvConfig } from "./env.validation";

export const envConfig = (): EnvConfig => ({
	NODE_ENV: process.env.NODE_ENV as EnvConfig["NODE_ENV"],
	PORT: parseInt(process.env.PORT),
	DATABASE_URL: process.env.DATABASE_URL,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: parseInt(process.env.REDIS_PORT),
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: parseInt(process.env.SMTP_PORT),
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,
	SMTP_FROM: process.env.SMTP_FROM,
	FRONTEND_URL: process.env.FRONTEND_URL,
});

