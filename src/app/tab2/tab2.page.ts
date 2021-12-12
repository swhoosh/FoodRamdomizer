import { Component } from '@angular/core';
import { MyDataProviderService } from '../my-data-provider.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private random_items = [];
  private isDisabled = false;
  private pickColor = "primary";
  private pickText = "PICK";
  private randomColor = "primary";

  private category = "All";
  private type_list: String[] = ["All", "Meal", "Dessert", "Drink"];

  constructor(private foodProvider: MyDataProviderService, private toastController: ToastController) {}

  ionViewDidEnter() {
  }

  doRandomize() {
    this.isDisabled = false;
    this.pickColor = "primary";
    this.pickText = "PICK";
    this.random_items = [];
    this.randomColor = "primary";
    
    console.log("doRandomize is called");
    this.foodProvider.randomize(this.random_items, this.category);
  }

  async doPickFood(item: any) {
    this.foodProvider.pickFood(item);
    item.pick += 1;
    this.isDisabled = true;
    this.pickColor = "danger";
    this.pickText = "PICKED";
    this.randomColor = "success";

    const toast = await this.toastController.create({
      message: item.name+" Picked",
      duration: 300
    });
    toast.present();
    console.log(this.random_items);
    this.ionViewDidEnter();
  }

}
