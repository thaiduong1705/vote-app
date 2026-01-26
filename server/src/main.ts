import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	// Global validation pipe for request DTOs
	app.useGlobalPipes(new ValidationPipe());
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
