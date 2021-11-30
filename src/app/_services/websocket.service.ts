import { Injectable, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ExpressionDTO } from '../_models/expressionDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public expressions!: ExpressionDTO[];
  private stompClient!: Stomp.Client;

  constructor(private http: HttpClient) {
      this.getAll().subscribe(expressions => {
        this.expressions = expressions;
    });
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    if(socket) {
      this.stompClient = Stomp.over(socket);
    }
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/topic/public', function () {

        
      });
    });
  }

  getAll() {
    return this.http.get<ExpressionDTO[]>(`${environment.hostUrl}/admin`, {withCredentials: true});
  }
}
