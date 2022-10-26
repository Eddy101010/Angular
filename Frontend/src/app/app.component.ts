import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'my-first-app';

    private hubConnectionBuilder!: HubConnection;
    offers: any[] = [];
    constructor() {}
    ngOnInit(): void {
        this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5227/offers' , {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets}
          )
          .configureLogging(LogLevel.Information).build();

        this.hubConnectionBuilder.start().then(() => console.log('Connection started')).catch(err => console.log('Connection error'));
        this.hubConnectionBuilder.on('SendOffersToUsers', (result: any) => {
            this.offers.push(result);
        });
    }
}
