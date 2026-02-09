import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
const cookieParser = require("cookie-parser");

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.use(cookieParser());

	// Global validation pipe for request DTOs
	app.useGlobalPipes(new ValidationPipe());

	// CORS configuration
	app.enableCors({
		origin: ["http://localhost:5173", "http://192.168.3.76:5173", "http://127.0.0.1:5173", ""],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
	});

	const port = configService.get<number>("PORT") || 3000;
	const nodeEnv = configService.get<string>("NODE_ENV");

	await app.listen(port, "0.0.0.0");

	console.log(`
Application is running!
URL: http://localhost:${port}
Environment: ${nodeEnv}
	`);
}
bootstrap();
