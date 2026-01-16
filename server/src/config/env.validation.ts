import { z } from "zod";

// Define Zod schema for environment variables
export const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.coerce.number().int().positive().default(3000),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	REDIS_HOST: z.string().default("localhost"),
	REDIS_PORT: z.coerce.number().int().positive().default(6379),
	SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),
	SMTP_PORT: z.coerce.number().int().positive().default(587),
	SMTP_USER: z.string().min(1, "SMTP_USER is required"),
	SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),
	SMTP_FROM: z.string().email("SMTP_FROM must be a valid email"),
	FRONTEND_URL: z.string().url().default("http://localhost:5173"),
});

// Infer TypeScript type from schema
export type EnvConfig = z.infer<typeof envSchema>;

// Custom validation function for ConfigModule
export function validate(config: Record<string, unknown>) {
	const result = envSchema.safeParse(config);

	if (!result.success) {
		const errors = result.error.format();
		console.error("Environment validation failed:");
		console.error(JSON.stringify(errors, null, 2));
		throw new Error("Environment validation failed");
	}

	return result.data;
}
