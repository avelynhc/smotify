import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> =[];
  favSub: any;

  constructor(private dms: MusicDataService) { }

  removeFromFavourites(id:any):void {
    this.favSub = this.dms.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    })
  }

  ngOnInit(): void {
    this.favSub = this.dms.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    })
  }

  ngOnDestroy(): void {
    this.favSub.unsubscribe();
  }
}
