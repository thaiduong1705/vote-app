# Task 2: Core Configuration & Modules

**Files:**

- Create: `server/src/config/env.validation.ts`
- Create: `server/src/config/env.config.ts`
- Create: `server/src/config/database.config.ts`
- Modify: `server/src/app.module.ts`
- Modify: `server/src/main.ts`

**Step 1: Install dependencies**

```bash
cd server
npm install @nestjs/config @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install @nestjs/bullmq bullmq nodemailer zod
npm install -D @types/nodemailer
```

**Step 2: Create environment validation schema**

Create `server/src/config/env.validation.ts`:

```typescript
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
```

**Step 3: Create environment configuration**

Create `server/src/config/env.config.ts`:

```typescript
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
```

**Step 4: Create database service with PostgreSQL adapter**

Create `server/src/config/database.config.ts`:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor(configService: ConfigService) {
		const connectionString = configService.get<string>("DATABASE_URL")!;
		const adapter = new PrismaPg({ connectionString });
		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
		console.log("Database connected");
	}

	async onModuleDestroy() {
		await this.$disconnect();
		console.log("Database disconnected");
	}
}
```

**Step 5: Update app module**

Modify `server/src/app.module.ts`:

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { envConfig } from "./config/env.config";
import { validate } from "./config/env.validation";
import { PrismaService } from "./config/database.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [envConfig],
			validate, // Zod validation
			cache: true,
		}),
	],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class AppModule {}
```

**Step 6: Update main.ts with security and validation**

Modify `server/src/main.ts`:

```typescript
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	// Global validation pipe for request DTOs
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		})
	);

	// CORS configuration
	app.enableCors({
		origin: configService.get<string>("FRONTEND_URL"),
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});

	const port = configService.get<number>("PORT");
	const nodeEnv = configService.get<string>("NODE_ENV");

	await app.listen(port);

	console.log(`
Application is running!
URL: http://localhost:${port}
Environment: ${nodeEnv}
	`);
}
bootstrap();
```

**Step 7: Test server starts**

Run: `npm run start:dev`

**Expected Output:**

```
✅ Database connected
🚀 Application is running!
📍 URL: http://localhost:3000
🌍 Environment: development
```

**Validation Test:**

Test environment validation by starting without required variables:

```bash
# Should fail with detailed error messages
DATABASE_URL="" npm run start:dev
```

Expected error output:

```
❌ Environment validation failed:
{
  "DATABASE_URL": {
    "_errors": ["DATABASE_URL is required"]
  }
}
```

**Step 8: Verify configuration access**

Create test file `server/src/test-config.ts`:

```typescript
import { ConfigService } from "@nestjs/config";
import { EnvConfig } from "./config/env.validation";

// Example usage in any service
export class ExampleService {
	constructor(private configService: ConfigService) {
		// Type-safe access to config
		const dbUrl = this.configService.get<string>("DATABASE_URL");
		const port = this.configService.get<number>("PORT");
		const nodeEnv = this.configService.get<EnvConfig["NODE_ENV"]>("NODE_ENV");

		console.log({ dbUrl, port, nodeEnv });
	}
}
```

Delete this test file after verification.

