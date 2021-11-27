import { Component, OnInit } from '@angular/core';
import { CalcService } from '../_services/calc.service';
import { ExpressionDTO } from '../_models/expressionDTO';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  loading = false;
  expression!: ExpressionDTO;

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.loading = true;
    this.calcService.cancelExpression().subscribe(expression => {
        this.loading = false;
        this.expression = expression;
    });
  }

  submitOp(op: string){
    this.loading = true;
    this.calcService.setOP(op).subscribe(expression => {
      this.loading = false;
      this.expression = expression;
    });
  }

  submitNum(num: string){
    this.loading = true;
    this.calcService.setNum(num).subscribe(expression => {
      this.loading = false;
      this.expression = expression;
    });
  }

  submitCancel(){
    this.loading = true;
    this.calcService.cancelExpression().subscribe(expression => {
      this.loading = false;
      this.expression = expression;
    });
  }

/*   submitEnter(){
    this.loading = true;
    this.calcService.saveExpression().subscribe(expression => {
      this.loading = false;
      this.expression = expression;
    }, error => {
      alert(error.message);
    });
  } */

  submitEnter(){
    this.loading = true;
    this.calcService.saveExpression().subscribe({
      next: (expression) => {
        this.loading = false;
        this.expression = expression;
      },
      error: (msg) => {alert(msg.error)}
    })
  }

  submitComma(){
    this.loading = true;
    this.calcService.setComma().subscribe(expression => {
      this.loading = false;
      this.expression = expression;
    });
  }

}

