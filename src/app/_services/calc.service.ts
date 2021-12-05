import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ExpressionDTO } from '../_models/expressionDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalcService {
    constructor(private http: HttpClient) { }


    calculateExpression(expression: ExpressionDTO): Observable<any>{
        return this.http.post<any>(`${environment.hostUrl}/calc/expression/calculate`, expression, {withCredentials: true});
    }

    saveExpression(expression: ExpressionDTO): Observable<ExpressionDTO>{
        return this.http.put<ExpressionDTO>(`${environment.hostUrl}/calc/expression/add`, expression, {withCredentials: true});
    }
    
}