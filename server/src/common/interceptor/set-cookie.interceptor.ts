import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Response } from "express";

export interface CookieConfig {
	name: string;
	value: string;
	options?: {
		httpOnly?: boolean;
		secure?: boolean;
		sameSite?: "strict" | "lax" | "none";
		maxAge?: number;
	};
}

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				const response = context.switchToHttp().getResponse<Response>();

				if (data?.token) {
					response.cookie("token", data.token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: "lax",
						maxAge: 1 * 2 * 60 * 60 * 1000, // 2 giờ
					});
				}

				return data;
			}),
		);
	}
}
