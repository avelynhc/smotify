import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  albums: any;
  albumsSub: any;
  artist: any;
  artistSub: any;

  constructor(private route: ActivatedRoute, private dms: MusicDataService) {}

  ngOnInit(): void {
    this.artistSub = this.route.params.subscribe((params: any) => {
        this.dms.getArtistById(params.id).subscribe((data) => {
          this.artist = data;
        })

        this.albumsSub = this.dms.getAlbumsByArtistId(params.id).subscribe((data) => {
          this.albums = data.items.filter(
            (curValue, index, self) => self.findIndex(t => 
              t.name.toUpperCase() === curValue.name.toUpperCase()) === index
              );
        })
    })      
  }
  ngOnDestroy():void {
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }
}
