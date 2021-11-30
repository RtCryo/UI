import { Component, OnInit } from '@angular/core';
import { ExpressionService } from '../_services/expression.service';
import { ExpressionDTO } from '../_models/expressionDTO';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-list-expressions',
  templateUrl: './list-expressions.component.html',
  styleUrls: ['./list-expressions.component.css']
})
export class ListExpressionsComponent implements OnInit {
  
  constructor(public webSocket: WebsocketService) {
    
  }

  ngOnInit() {

    /* this.expressionService.getAll().subscribe(expressions => {
        this.loading = false;
        this.expressions = expressions;
    }); */
  }

}
