import { NgClass } from '@angular/common';
import { Component, computed, inject, input, Signal } from '@angular/core';
import { Player } from '../player.model';
import { PlayerStore } from '../player.store';

@Component({
  selector: 'app-player-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './player-item.component.html',
  styleUrl: './player-item.component.scss',
})
export class PlayerItemComponent {
  store=inject(PlayerStore)

  head = input<boolean>(false);
  player = input<Player>();
  no = input<string>();


  played: Signal<number> = computed(
    () =>
      (this.player()?.playerScore?.won || 0) +
      (this.player()?.playerScore?.lost || 0)
  );
  setSort(by: string) {
    if (!this.head()) return;
  
    const currentSort = this.store.sort();
    const isDescending = currentSort.startsWith('-');
  
    if (currentSort.includes(by)) {
      this.store.updateSort(isDescending ? by : `-${by}`);
    } else {
      this.store.updateSort(by === 'name' ? by : `-${by}`);
    }
  }
}
