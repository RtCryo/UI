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
  isSave: boolean = false;
  isFirstVal: boolean = false;
  isNextNum: boolean = true;
  isNextOperation: boolean = false;
  lastButton: string = "";

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.loading = true;
    this.expression = new ExpressionDTO();
  }

  submitOp(op: string){
    if (this.isNextOperation) {
      if(this.isFirstVal){
        if(!this.isSave){
          this.expression.secondValue
          this.calcService.calculateExpression(this.expression).subscribe({
            next: (num) => {
              this.loading = false;
              this.expression.result = num;
              this.expression.firstValue = this.expression.result;
              this.expression.expressionList += " " + this.expression.secondValue + " " + op;
              this.isFirstVal = true;
              this.expression.secondValue = "";
              this.expression.operation = op;
              this.isNextOperation = false;
              this.lastButton = "op";
            },
            error: (msg) => { 
              alert(msg.error) 
              this.submitCancel();
            }
          })
          return;
        } else {
          this.expression.expressionList = "";
          this.isSave = false;
          this.expression.secondValue = "";
        }
      }
      this.isFirstVal = true;
      this.expression.expressionList = this.expression.firstValue + " " + op;
    } else {
      if(this.isFirstVal){
        this.expression.expressionList = this.expression.expressionList.substr(this.expression.expressionList.length - 1) + op;
      } else {
        this.expression.firstValue = "0";
        this.isFirstVal = true;
        this.expression.expressionList = "0 " + op;
      }
    }
    this.expression.operation = op;
    this.isNextOperation = false;
    this.lastButton = "op";
  }

  submitNum(num: string){
    if(this.expression.result === "0" && num === "0") {
      return;
    }
    if(this.isSave) {
      this.submitCancel();
    }
    if(this.isNextNum) {
      this.isNextOperation = true;
      if(this.isFirstVal) {
        if(this.lastButton === "op" || this.lastButton === "error") { 
          this.expression.secondValue = num;
        } else {
          this.expression.secondValue += num;
        }
        this.expression.result = this.expression.secondValue;
      } else {
        this.expression.firstValue += num
        this.expression.result = this.expression.firstValue;
      }
    }
    this.lastButton = "num";
  }

  submitCancel(){
    this.loading = true;
    this.isSave = false;
    this.isFirstVal = false;
    this.isNextNum = true;
    this.isNextOperation = false;
    this.lastButton = "";
    this.expression = new ExpressionDTO();
  }

  calculate(){
    this.calcService.calculateExpression(this.expression).subscribe({
      next: (num:string) => {
        this.loading = false;
        this.expression.result = num.toString().replace(".",",");
        if(this.lastButton === "enter") {
          this.expression.expressionList += " " + this.expression.secondValue + " = " + this.expression.result;
          this.calcService.saveExpression(this.expression).subscribe({
            next: (expression) => {
              this.loading = false;
              this.expression = expression;
              this.expression.firstValue = this.expression.result;
              this.isSave = true;
            },
            error: (msg) => {
              alert(msg.error)
              this.submitCancel();
            }
          })
        }
      },
      error: (msg) => { 
        alert(msg.error) 
        this.submitCancel();  
      }
    })
  }

  submitEnter(){
    this.loading = true;
    if (this.lastButton = "op") {
      this.expression.secondValue = this.expression.result;
    }
    this.lastButton = "enter";
    this.calculate();
  }

  submitComma(){
     if(this.expression.result.indexOf(",") > -1 && !(this.lastButton === "op") && !(this.lastButton === "enter")) {
       return;
     }
     if(this.lastButton === "enter" || this.lastButton === "op" || this.lastButton === "") {
       if (!this.isFirstVal) {
         this.expression.firstValue = "0";
       } else {
         this.expression.secondValue = "0";
       }
     }
     if(!this.isFirstVal){
       this.expression.firstValue += ",";
       this.expression.result = this.expression.firstValue;
     } else {
      this.expression.secondValue += ",";
      this.expression.result = this.expression.secondValue;
     }
     this.lastButton = "comma";
  }
}

