import { Component, OnInit } from '@angular/core';
import { availableLocations } from './available-locations';
import { FormControl } from '@angular/forms';
import { LocationFacadeService } from '../../location/location-facade.service';
import { ILocation } from '../../location/location-state.service';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})
export class LocationSelectorComponent implements OnInit {
  availableLocations: ILocation[] = availableLocations;
  form: FormControl = new FormControl(availableLocations[0]);


  constructor(private readonly locationFacade: LocationFacadeService) { }

  ngOnInit(): void {
    // TODO: unsub OnDestroy
    this.form.valueChanges.subscribe((location: ILocation) => {
      this.locationFacade.setLocation(location);
    });
  }

}
