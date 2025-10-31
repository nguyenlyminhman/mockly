
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { doGet } from 'src/common/rest.api';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('AuthInterceptor: Before handling authentication');
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'] || '';
        const token = authHeader.replace('Bearer ', '');

        const url: string = process.env.AUTH_SERVICE_URL || '';
        const now = Date.now();
        // const auth = from(doGet(url, { token: token }))
        return from(doGet(url, { token: token }))
            .pipe(
                map((res) => res['result']),
                switchMap((authResult) => {
                    // ✅ Gắn vào request, controller sẽ thấy được
                    request.user = authResult;


                    return next.handle()
                    // .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
                }),
                tap(() => console.log(`AuthInterceptor: Total handling authentication ... ${Date.now() - now}ms`)),
                catchError((error) => {
                    if (error.status === 401) {
                        return throwError(() => new UnauthorizedException('Token không hợp lệ'));
                    }
                    return throwError(() => new BadRequestException('Lỗi khi xác thực người dùng'));
                }),
            );

        // return auth;
    }
}
