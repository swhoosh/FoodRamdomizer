import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodModel } from 'src/models/food.model';
import { MyDataProviderService } from '../my-data-provider.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private name: String;
  private category: String;
  private price: String;
  private calories: String;
  private delivery: String;
  private isChecked: boolean;

  private type_list: String[] = ["Meal", "Dessert", "Drink"];

  constructor(private foodProvider: MyDataProviderService, private toastController: ToastController) {}

  async doAddFood() {
    if (this.isChecked) {
      this.delivery = "Yes";
    }
    else this.delivery = "No";

    console.log("doAddFood is called");
    console.log(this.name);
    console.log(this.category);
    console.log(this.price);
    console.log(this.calories);
    console.log(this.delivery);

    this.foodProvider.addFood(this.name, this.category, this.price, this.calories, this.delivery);

    this.name = "";
    this.category = "";
    this.price = "";
    this.calories = "";
    this.delivery = "";

    const toast = await this.toastController.create({
      message: "Food Added",
      duration: 400
    });
    toast.present();
  }

}
