import { Component, inject, OnInit, } from '@angular/core';
import { PlayersListComponent } from "./players-list/players-list.component";
import { SearchPlayerComponent } from "./search-player/search-player.component";
import { PlayerStore } from './players-list/player.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PlayersListComponent, SearchPlayerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  store=inject(PlayerStore)
  ngOnInit(): void {
    this.store.loadPlayers()
  }
}
