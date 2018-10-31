import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { StatsProvider } from '../../providers/stats/stats';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public statsProvider: StatsProvider) {
  }

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');

    this.displayRaceChartView();
    this.displayMatchupWinrateview();

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
          }
        ]
      }
    });
  }
  displayMatchupWinrateview(): any {
    Promise.all([
      this.statsProvider.getWinrateByMatchup('Protoss', 'Terran'), 
      this.statsProvider.getWinrateByMatchup('Protoss', 'Zerg'), 
      this.statsProvider.getWinrateByMatchup('Protoss', 'Protoss')
    ]).then(winrate => {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Terran', 'Zerg', 'Protoss'],
          datasets: [{
            label: 'Winrate',
            data: [winrate[0], winrate[1], winrate[2]],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true, 
                suggestedMax: 100
              }
            }]
          }
        }
      });
    });
  }
  displayRaceChartView(): any {
    Promise.all([
      this.statsProvider.getGamesCountByRace('Protoss'), 
      this.statsProvider.getGamesCountByRace('Zerg'), 
      this.statsProvider.getGamesCountByRace('Terran')
    ]).then(res => {
      console.log('Promises fetched: ' + res);
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Terran', 'Zerg', 'Protoss'],
          datasets: [{
            label: 'Games played by race',
            data: [res[2], res[0], res[1]],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#FFCE56',
              '#36A2EB'
            ]
          }]
        }
      });
    });
  }
}
