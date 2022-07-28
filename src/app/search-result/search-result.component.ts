import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  resultsSub: any;
  searchQuery: string = "";

  constructor(private route: ActivatedRoute, private dms: MusicDataService) { }

  ngOnInit(): void {
    this.resultsSub = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params["q"];
      this.dms.searchArtists(params["q"]).subscribe((data) => {
        this.results = data.artists.items.filter(
          data => data.images.length > 0
        );
      })
    })
  }

  ngOnDestroy():void {
    this.resultsSub.unsubscribe();
  }
}
