import { Injectable } from '@angular/core';
import { ILocation, LocationStateService } from './location-state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationFacadeService {

  constructor(private readonly state: LocationStateService) { }

  getLocation(): Observable<ILocation> {
    return this.state.data$;
  }

  setLocation(location: ILocation): void {
    this.state.data = location;
  }
}
