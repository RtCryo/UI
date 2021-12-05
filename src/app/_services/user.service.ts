import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { MessageDTO } from '../_models/messageDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.hostUrl}/users`, {withCredentials: true});
    }

    postNewUser(user: User) {
        return this.http.post<MessageDTO>(`${environment.hostUrl}/users/create`, user, {withCredentials: true});
    }
}