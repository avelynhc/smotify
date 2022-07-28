import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  albumSub: any;
  id: string ="";
  idSub: any;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private dms: MusicDataService) { }

  ngOnInit(): void {
    this.idSub = this.route.params.subscribe((params:any) => {
      this.id = params["id"];
      this.albumSub = this.dms.getAlbumById(this.id).subscribe((data) => {
        this.album = data;
      })
    })
  }

  addToFavourites(trackId: any):void {
      this.dms.addToFavourites(trackId).subscribe({next: (successData) => {
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      }, error: (e) => {
        this.snackBar.open("Adding to Favourites...", "Unable to add song to Favourties", { duration: 1500 });
      }})
  }

  ngOnDestroy():void {
    this.idSub.unsubscribe();
    this.albumSub.unsubscribe();
  }
}
