import { Component } from '@angular/core';
import { AppData } from './appData'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {

  testDataLocation:'assets/data.json';
  orders = []; //holds existing orders
  originalOrder = [{
      "customerInformation": "NBME",
      "creationDate": "10-1-19",
      "dueDate": "10-20-19",
      "listOfOrderedProd": 
          [{
          "product": "wands",
          "number": 4
          }]
    }];
  newOrderStarted: boolean = false;
  isOrderActive1: boolean = false;
  isOrderActive2: boolean = false;
  itemSubmitted: boolean = false;
  newOrder = {
      "customerInformation": "",
      "creationDate": 1,
      "dueDate": "",
      "listOfOrderedProd": [],
  }
  newListOfItems = []; 
  today: number = Date.now()
  formData = new AppData('', '','', '');
  
  constructor() {};

  ngOnInit(){
    //make call to DB to pull list of orders
    this.setLocalStorage()
    this.displayExistingOrders();
  };

  //sets a bool to display the ui to the user so they can star the order.
  startOrder(){
    this.newOrderStarted = true;
    this.isOrderActive1 = true;
  }

  //sets the current orders list to show what was in storage for the user to see
  displayExistingOrders(){
    console.log('display orders fired')
    this.orders = (JSON.parse(localStorage.getItem("orders")));
    console.log("this is the current set of orders" + JSON.stringify(this.orders))
  }

  //this handles the main addition of the order, starts the ux flow, This also handles the form requirement validation.
  onSubmit(e){
    if( this.formData.csName == '' && this.formData.dueDate == '' ){
      alert('All fields are required to continue.')
    } else {
      event.preventDefault();
      console.log("form was submitted");
      console.log(e.value); 
      this.newOrder.customerInformation = e.value.csInformation;
      this.newOrder.dueDate = e.value.dueDate;
      this.newOrder.creationDate = this.today;
      this.isOrderActive1 = false;
      this.isOrderActive2 = true;
    }
  }

  //this handles the additions of the items list to the main order. This also handles the form requirement validation.
  onSubmitItem(e) {
    if( this.formData.itemName == '' && this.formData.itemNumber == ''){
      alert('All fields are required to continue.')
    } else {
      event.preventDefault();
      console.log("list submit was fired");
      console.log(e.value);
      this.newListOfItems.push({"product": e.value.item, "number": e.value.numOfItems})
      this.itemSubmitted = true;
      this.formData.itemName = '';
      this.formData.itemNumber = '';
    }
  }
  
  //this take the new order, places it in to the orders var and submits the new combined order list
  submitOrder(){
    console.log("order has been submitted");
    this.newOrder.listOfOrderedProd = this.newListOfItems;
    this.orders.push(this.newOrder);
    console.log("this is orders before I push" + JSON.stringify(this.orders))
    localStorage.setItem("orders",JSON.stringify(this.orders));
    this.isOrderActive1 = false
    this.isOrderActive2 = false;
    this.itemSubmitted = false;
    this.newOrderStarted = false;
    this.clearNewOrder();
    console.log(this.orders);
    console.log("these are the orders from storage" + localStorage.getItem("orders"));
  }

  //sets the var newOrder back after saving order.
  clearNewOrder(){
    this.newOrder = {
      "customerInformation": "",
      "creationDate": 1,
      "dueDate": "",
      "listOfOrderedProd": []
    }
  }

  //this checks to see if there are any values in local storage. This is really only ment to populate a starting value.
  setLocalStorage(){
    let testStorage = localStorage.getItem("orders")
    console.log("set location fired " + testStorage)
    if(testStorage == null) {
      localStorage.setItem("orders",JSON.stringify(this.originalOrder))
    }
  }
  

}