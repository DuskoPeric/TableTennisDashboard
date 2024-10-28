import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../ui/input/input.component";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlayerStore } from '../players-list/player.store';

@Component({
  selector: 'app-search-player',
  standalone: true,
  imports: [InputComponent,ReactiveFormsModule],
  templateUrl: './search-player.component.html',
  styleUrl: './search-player.component.scss'
})
export class SearchPlayerComponent implements OnInit{
  store=inject(PlayerStore);

  search = new FormControl('');
  searchIcon=faSearch;
  onChanges(): void {
    this.search.valueChanges.subscribe(val => {
      this.store.updateSearch(val!)
    });
  }
  ngOnInit(): void {
    this.onChanges();
  }
}
