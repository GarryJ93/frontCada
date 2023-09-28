import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
//import { Socket, io } from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Messages } from '../models/messages';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {



  constructor(private socket: Socket) {
    // this.socket = io('ws://localhost:3000/')
  }


  listen(eventName: string) {
    console.log("Listen");
    return this.socket.fromEvent(eventName);
    // return new Observable((subscriber) => {
    //   this.socket.on(eventName, (data: any) => {
    //     console.log("-------", data);

    //     subscriber.next(data);

    //   })
    // })
  }


  emit(eventName: string, data: Messages) {
    console.log(`émission de l'événement ${eventName} avec ca comme data :`, data);
    this.socket.emit(eventName, data);
  }


}

