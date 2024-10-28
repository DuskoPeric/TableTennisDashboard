import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  http=inject(HttpClient);

  getPlayers():Observable<Player[]> {
    return this.http
      .get<Player[]>('http://localhost:3000/660/users')
  }

  constructor() { }
}
