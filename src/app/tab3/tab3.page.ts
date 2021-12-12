import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MyDataProviderService } from '../my-data-provider.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('doughnutCanvas', {static: true}) private doughnutCanvas: ElementRef;
  @ViewChild('barCanvas', {static: true}) private barCanvas: ElementRef;

  private category = "All";
  private type_list: String[] = ["All", "Meal", "Dessert", "Drink"];

  private doughnutChart: any;
  private x_data=[];
  private y_data=[];

  private barChart: any;
  private x1_data=[];
  private y1_data=[];

  constructor(private foodProvider: MyDataProviderService) {
    Chart.register(...registerables);
  }

  ionViewDidEnter() {
    this.doughnutChartMethod();
    this.foodProvider.getTypeCountData(this.x_data, this.y_data, this.doughnutChart);

    this.barChartMethod(); 
    this.foodProvider.getTopPick(this.x1_data, this.y1_data, this.category, this.barChart);
  }

  ionViewDidLeave() {
    this.doughnutChart.destroy();
    this.barChart.destroy();
    this.x_data=[];
    this.y_data=[];
    this.x1_data=[];
    this.y1_data=[];
  }
  
  ngOnInit() {
  }

  categoryUpdated() {
    this.barChart.destroy();
    this.x1_data=[];
    this.y1_data=[];
    this.barChartMethod(); 
    this.foodProvider.getTopPick(this.x1_data, this.y1_data,this.category, this.barChart);
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.x_data,
        datasets: [{
          label: 'Count of each food type',
          data: this.y_data,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      },
      options: {
        aspectRatio: 0.8
      }
    });
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.x1_data,
        datasets: [{
          label: '# of pick',
          data: this.y1_data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          hoverBackgroundColor: [
            'rgba(255,99,132,0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        aspectRatio: 0.7
      }
    });
  }




}
