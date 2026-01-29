import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.use(cookieParser());

	// Global validation pipe for request DTOs
	app.useGlobalPipes(new ValidationPipe());
	// CORS configuration
	app.enableCors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
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
