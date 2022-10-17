import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-first-app';

  // public chartOptions: any = {
  //   scaleShowVerticalLines: true,
  //   responsive: true,
  //   scales: {
  //     yAxes:[{
  //       ticks: {
  //         beginAtZero: true
  //       }
  //     }]
  //   }
  // }
  // public chartLabels: string[] = ['Real time data for chart'];
  // public chartType: string = 'bar';
  // public chartLegend: boolean = true;
  // public colors: any[] = [
  //   { backgroundColor: '#5491DA'},
  //   { backgroundColor: '#E74C3C'},
  //   { backgroundColor: '#82E0AA'},
  //   { backgroundColor: '#E5E7E9'}]

  constructor(public signalRService: SignalRService, private http: HttpClient){}

  ngOnInit(){
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () =>{
    this.http.get('https://localhost:5227/api/chart')
    .subscribe(res =>{
      console.log(res);
    })
  }
}
