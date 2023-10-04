import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private url = environment.SOCKET_ENDPOINT;
  socket: any;
  observer: any;
  constructor() {
    this.socket = io(this.url);
    this.socket.on('connect', () => {
      console.log('Connect to Socket Server...');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnect from Socket Server...');
    });


  }
  getSocketData(): Observable<any> {
    this.socket.on('MatchScore1', (res:any) => {
      this.observer.next(res);
    });
    return this.getSocketDataObservable();
  }
  getSocketDataObservable(): Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }

}
