import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req.clone({
            setParams: {
                key: "JCtwgBnCZuRnnFBEMQYF",
                secret: "knPynqmmlBMvHglzToWnmQDRFTcdktrJ"
            }
        });
        return next.handle(authReq);
    }
}