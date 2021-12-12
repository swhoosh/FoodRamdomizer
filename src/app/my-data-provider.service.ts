import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodModel } from 'src/models/food.model';



@Injectable({
  providedIn: 'root'
})
export class MyDataProviderService {

  url = "place-ngrok-url-here";

  constructor(public http: HttpClient) {}

  addFood(name: String, category: String, price: String, calories: String, delivery: String)  {
    console.log("addFood is called");
    this.http.get(this.url+"/add_food?name="+name+"&category="+category+"&price="+price+"&calories="+calories+"&delivery="+delivery).subscribe();
  }

  deleteItem(item: any) {
    console.log("deleteItem:"+item.name);
    this.http.get(this.url+'/delete_item?name='+item.name+'&category='+item.category+'&price='+item.price+'&calories='+item.calories+'&delivery='+item.delivery).subscribe();
  }

  randomize(random_items: any, category: String) {
    console.log("randomize is called");
    this.http.get(this.url+"/randomize?category="+category).subscribe(res => {
      for(let i=0; i<res['data'].length; i++) {
        console.log(res['data'][i]);
        random_items.push(res['data'][i]);
      }
    });
    }
  
  pickFood(item: any) {
    console.log("pickFood is called");
    this.http.get(this.url+'/increase_pick?name='+item.name+'&category='+item.category+'&price='+item.price+'&calories='+item.calories+'&delivery='+item.delivery).subscribe();
  }

  getTypeCountData(x_data: any, y_data: any, doughnutChart: any) {
    this.http.get(this.url+"/count_type").subscribe(data => {
      for(let i=0; i<data['data']['index'].length; i++) {
        x_data.push(data['data']['index'][i]);
      }

      for(let i=0; i<data['data']['count'].length; i++) {
        y_data.push(data['data']['count'][i]);
      }
      
      console.log(x_data);
      console.log(y_data);

      doughnutChart.update(0);
    });
  }

  getList(index: any, item_list: any, category: String, event) {
    console.log("getList is called");

    this.http.get(this.url+'/get_list?index='+index+'&category='+category).subscribe(data => {
       for(let i=0; i<data['data'].length; i++) {
          //console.log(data['data'][i]);
          item_list.push(data['data'][i]);
       }
    });

    if(index != 0) {
      event.target.complete();
    }
  }

  getTopPick(x_data: any, y_data: any, category: String, barChart: any) {
    console.log('getTopPick called');
    this.http.get(this.url+"/get_top_pick?category="+category).subscribe(data => {
      for(let i=0; i<data['data']['index'].length; i++) {
        x_data.push(data['data']['index'][i]);
      }

      for(let i=0; i<data['data']['pick'].length; i++) {
        y_data.push(data['data']['pick'][i]);
      }
      
      console.log(x_data);
      console.log(y_data);

      barChart.update(0);
    });
  }


}
