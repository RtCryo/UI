import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ExpressionDTO } from '../_models/expressionDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalcService {
    constructor(private http: HttpClient) { }

    setNum(num: String): Observable<ExpressionDTO>{
        return this.http.post<ExpressionDTO>(`${environment.hostUrl}/calc/expression/submitNum`, num, {withCredentials: true});
    }

    setOP(op: String): Observable<ExpressionDTO>{
        return this.http.post<ExpressionDTO>(`${environment.hostUrl}/calc/expression/submitOperation`, op, {withCredentials: true});
    }

    saveExpression(): Observable<ExpressionDTO>{
        return this.http.get<ExpressionDTO>(`${environment.hostUrl}/calc/expression/saveExpression`, {withCredentials: true});
    }

    cancelExpression(): Observable<ExpressionDTO>{
        return this.http.get<ExpressionDTO>(`${environment.hostUrl}/calc/expression/cancelExpression`, {withCredentials: true});
    }

    setComma(): Observable<ExpressionDTO>{
        return this.http.get<ExpressionDTO>(`${environment.hostUrl}/calc/expression/submitComma`, {withCredentials: true});
    }
    
}