import { Component, OnInit } from '@angular/core';
import { ExpressionDTO } from '../_models/expressionDTO';
import { ExpressionService } from '../_services/expression.service';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-list-expressions',
  templateUrl: './list-expressions.component.html',
  styleUrls: ['./list-expressions.component.css']
})
export class ListExpressionsComponent implements OnInit {
  
  checked = false;

  constructor(public webSocket: WebsocketService, private expressionService: ExpressionService) {

  }

  ngOnInit() {

  }

  CheckAllOptions() {
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".chkBox");
    checkboxes.forEach((e) => {
      if(!this.checked) { 
        e.checked = true;
      }
      else {
        e.checked = false;
      }
    })
  }

  resetCheckAll(){
    let masterCheckBox = document.querySelector(".masterChkBox") as HTMLInputElement;
    masterCheckBox.checked = false;
    this.checked = false;
  }

  deleteExpressions(){
    let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".chkBox");
    let listToDelete: ExpressionDTO[] = [];
    checkboxes.forEach((e) => {
      if(e.checked) { 
        let id: number = +e.getAttribute("id")!;
        this.webSocket.expressions.forEach((expression) => {
          if(expression.id === id) {
            listToDelete.push(expression);
            return;
          }
        })
      }
    })
    if(listToDelete.length > 0) {
      this.expressionService.sendToDelete(listToDelete).subscribe({
        next: () => {
          this.resetCheckAll();
        },
        error: (msg) => {
          alert(msg);
        }
      });
    }
  }
}
