import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ExpressionDTO } from '../_models/expressionDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpressionService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<ExpressionDTO[]>(`${environment.hostUrl}/admin`, {withCredentials: true});
    }

    sendToDelete(arr: ExpressionDTO[]): Observable<ExpressionDTO[]> {
        return this.http.post<ExpressionDTO[]>(`${environment.hostUrl}/admin/delete`, arr, {withCredentials: true} );
    }
}