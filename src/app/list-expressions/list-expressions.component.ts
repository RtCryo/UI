import { Component, OnInit } from '@angular/core';
import { ExpressionService } from '../_services/expression.service';
import { ExpressionDTO } from '../_models/expressionDTO';

@Component({
  selector: 'app-list-expressions',
  templateUrl: './list-expressions.component.html',
  styleUrls: ['./list-expressions.component.css']
})
export class ListExpressionsComponent implements OnInit {
  
  loading = false;
  expressions!: ExpressionDTO[];

  constructor(private expressionService: ExpressionService) { }

  ngOnInit() {
    this.loading = true;
    this.expressionService.getAll().subscribe(expressions => {
        this.loading = false;
        this.expressions = expressions;
    });
  }

}
