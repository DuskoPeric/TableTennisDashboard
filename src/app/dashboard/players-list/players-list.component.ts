import { Component, Input, input } from '@angular/core';
import { PlayerItemComponent } from "./player-item/player-item.component";
import { Player } from './player.model';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [PlayerItemComponent],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  players=input<Player[]>();
  order(num:number){
    return num>8? String(num+1): '0'+(num+1)
  }
}
