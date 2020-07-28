import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebSocketService {


  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.baseUrl);
    let observable = new Observable(observer => {
        this.socket.on('cartChangeEvent', (data) => {
          // console.log("Received message from Websocket Server");
          if( (data.type == "update" || data.type == "insert") && data.fullDocument.products){
            observer.next(data.fullDocument.products);
          }
        })
    });
    let observer = {};
    return Rx.Subject.create(observer, observable);
  }

}
