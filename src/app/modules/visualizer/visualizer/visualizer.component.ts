import { Component, OnInit } from '@angular/core';
import { LocationFacadeService } from '../../location/location-facade.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  constructor(public readonly locationFacade: LocationFacadeService) { }

  ngOnInit(): void {
    this.locationFacade.setLocation({
      commune: '95',
      departement: '95612'
    });
  }

}
