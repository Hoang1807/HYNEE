import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import { HttpRevenueService } from 'src/app/service/http-revenue.service';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent implements AfterViewInit, OnInit {
  listRevenue: number[] = new Array(12).fill(0);
  @ViewChild('inputYear') inputYear: ElementRef;
  chart: Chart;
  nowDay: string = '';
  sumDay: number = 0;
  constructor(private httpRevenue: HttpRevenueService) {}
  ngOnInit(): void {
    this.onChart();
    this.onLoadRevenue();
  }
  ngAfterViewInit(): void {
    var myPieChart = new Chart($('#myPieChart'), {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Referral', 'Social'],
        datasets: [
          {
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
    this.onLoadRevenue();
    this.onChangeYear();
  }
  onChangeYear() {
    const month = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const valueYear = this.inputYear.nativeElement.value;
    this.listRevenue = new Array(12).fill(0);
    month.forEach((element) => {
      let month_year = `${valueYear}-${element}-13`;
      this.httpRevenue.calculateRevenue(month_year, 'month_year').subscribe({
        next: (data) => {
          const i = parseInt(element);
          this.listRevenue[i - 1] = data.body.totalRevenue;
        },
        complete: () => {
          this.chart.data.datasets[0].data = this.listRevenue;
          this.chart.update();
        },
      });
    });

    setTimeout(() => {
      let flag = true;
      for (let item of this.listRevenue) {
        if (item == 0) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.chart.data.datasets[0].data = this.listRevenue;
        this.chart.update();
      }
    }, 500);
  }
  onChart() {
    this.chart = new Chart($('#myAreaChart'), {
      type: 'line',
      data: {
        labels: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
        datasets: [
          {
            label: 'Doanh Thu',
            lineTension: 0.3,
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointBorderColor: 'rgba(78, 115, 223, 1)',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: this.listRevenue,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              time: {
                unit: 'date',
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                maxTicksLimit: 12,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 10,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return value + ' VND';
                },
              },
              gridLines: {
                color: 'rgb(234, 236, 244)',
                zeroLineColor: 'rgb(234, 236, 244)',
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel =
                chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': ' + tooltipItem.yLabel + ' VND';
            },
          },
        },
      },
    });
  }

  onLoadRevenue() {
    let value: number = 0;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Cộng 1 vì tháng trong Date bắt đầu từ 0
    const year = currentDate.getFullYear();
    this.nowDay = `${year}-${month}-${day}`;
    this.httpRevenue.calculateRevenue(this.nowDay, 'day').subscribe({
      next: (data) => {
        value = data.body.totalRevenue == null ? 0 : data.body.totalRevenue;
        this.sumDay =  value;
      },
      error: (err) => {},
    });
    
  }
}
