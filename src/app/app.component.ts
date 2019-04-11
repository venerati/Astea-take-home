import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {

  testDataLocation:'assets/data.json';
  orders = [];
  originalOrder = [
    {
      "customerInformation": "NBME",
      "creationDate": "10-1-19",
      "dueDate": "10-20-19",
      "listOfOrderedProd": 
          [{
          "product": "wands",
          "number": 4
          }]
    }
  ];
  numberOfItemsInOrder = [1];
  
  constructor() {};

  ngOnInit(){
    //make call to DB to pull list of orders
    this.setLocalStorage()
    this.displayExistingOrders();
  };

  displayExistingOrders(){
    console.log('display orders fired')
    this.orders.push(JSON.parse(localStorage.getItem("orders")));
    console.log(this.orders)
  }

  addItemToOrder(){
    this.numberOfItemsInOrder.push(1);
  }

  buttonClicked(event) {
    event.preventDefault();
    console.log(event);
  }
  

  //make a create new order
  createNewOrder(){
    let anotherOrder = {
      "customerInformation": "NBME",
      "creationDate": "10-1-19",
      "dueDate": "10-20-19",
      "listOfOrderedProd": 
          [{
          "product": "wands",
          "number": 4
          }]
    }
    this.orders[0].push(anotherOrder);
    console.log(this.orders)
  }


  setLocalStorage(){
    localStorage.setItem("orders",JSON.stringify(this.originalOrder))

  }

  pullOrdersFromStorage(){
    console.log(localStorage.length);
    console.log(localStorage.getItem("orders"))
    localStorage.setItem("orders",JSON.stringify(this.orders))
  }
  

}