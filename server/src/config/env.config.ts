import { EnvConfig } from "./env.validation";

export const envConfig = (): EnvConfig => ({
	NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
	PORT: parseInt(process.env.PORT || "3000", 10),
	DATABASE_URL: process.env.DATABASE_URL!,
	REDIS_HOST: process.env.REDIS_HOST || "localhost",
	REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379", 10),
	SMTP_HOST: process.env.SMTP_HOST!,
	SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
	SMTP_USER: process.env.SMTP_USER!,
	SMTP_PASS: process.env.SMTP_PASS!,
	SMTP_FROM: process.env.SMTP_FROM!,
	FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
});
