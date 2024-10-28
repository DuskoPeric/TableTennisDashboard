import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PlayerState } from './player.model';
import { computed, inject } from '@angular/core';
import { PlayerService } from './player.service';
import { AuthService } from '../../auth/auth.service';
export const PlayerStore = signalStore(
{ providedIn: 'root' },
  withState<PlayerState>({ players: [], sort: '', searchTerm: '' }),
  withComputed((store) => ({
    filteredPlayers: computed(() =>
      store
        .players()
        .sort(dynamicSort(store.sort()))
        .filter((player) =>
          player.name.toLowerCase().includes(store.searchTerm().toLowerCase())
        )
    ),
  })),
  withMethods(
    (
      store,
      playerService = inject(PlayerService),
      authService = inject(AuthService)
    ) => ({
      loadPlayers(): void {
        playerService.getPlayers().subscribe({
          next: (data) => {
            patchState(store, { players: data });
          },
          error: (error) => {
            if (error.status === 401) {
              authService.logOut();
            }
          },
        });
      },
      updateSort(sort:string):void{
        patchState(store,{sort})
      },
      updateSearch(searchTerm:string):void{
        patchState(store,{searchTerm})
      }
    })
  )
);

function dynamicSort<T>(property: string) {
  let sortOrder = 1;

  if (property.startsWith('-')) {
    sortOrder = -1;
    property = property.substring(1);
  }

  return function (a: T, b: T): number {
    const getValue = (obj: any, path: string): any => {
      return path.split('.').reduce((value, key) => value?.[key], obj);
    };

    const valueA = getValue(a, property);
    const valueB = getValue(b, property);

    const result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    return result * sortOrder;
  };
}
