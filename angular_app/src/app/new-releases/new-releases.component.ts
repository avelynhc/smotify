import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: any;
  releaseseSub: any;

  constructor(private dms: MusicDataService) { }

  ngOnInit(): void {
    this.releaseseSub = this.dms.getNewReleases().subscribe(data => {
      if(data) {
        this.releases = data.albums.items;
      }
    });
  }
  ngOnDestroy():void {
    this.releaseseSub.unsubscribe();
  }
}
