import { Component } from '@angular/core';
import { MyDataProviderService } from '../my-data-provider.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  private item_list = [];
  private page_number = 0;

  private category = "All";
  private type_list: String[] = ["All", "Meal", "Dessert", "Drink"];

  constructor(private foodProvider: MyDataProviderService, private toastController: ToastController) { }

  ionViewDidEnter() {
    // this.item_list = [];
    // this.page_number = 0;
    // this.foodProvider.getList(0, this.item_list, this.category, null);
  }

  ngOnInit() {
    this.item_list = [];
    this.page_number = 0;
    this.foodProvider.getList(0, this.item_list, this.category, null);
  }

  categoryUpdated() {
    console.log('category updated')
    this.item_list = [];
    this.page_number = 0;
    this.foodProvider.getList(0, this.item_list, this.category, null);
  }

  loadList(event) {
    this.page_number++;
    console.log('page_number : '+this.page_number);
    this.foodProvider.getList(this.page_number*10, this.item_list, this.category, event);
  }

  async doDeleteItem(item: any) {
    this.foodProvider.deleteItem(item);

    const toast = await this.toastController.create({
      message: item.name+" is Deleted",
      duration: 300
    });
    toast.present();

    this.item_list = [];
    this.page_number = 0;
    this.foodProvider.getList(0, this.item_list, this.category, null);
  }

}
