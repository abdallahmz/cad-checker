import { Component, OnInit } from '@angular/core';
import L from 'leaflet';
import { GeoJsonLoaderService } from '../geo-json-loader/geo-json-loader.service';
import { LocationFacadeService } from '../../location/location-facade.service';
import { ILocation } from '../../location/location-state.service';
import { GeoJsonType } from '../geo-json-loader/geo-json.type';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  map: L.Map;

  constructor(
    private readonly geoJsonLoader: GeoJsonLoaderService,
    private readonly locationFacade: LocationFacadeService
  ) { }

  ngOnInit(): void {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    this.map = L.map('leafletmap').setView([49.005473, 2.466446], 12);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    // TODO: destroy
    this.locationFacade
      .getLocation()
      .subscribe((location: ILocation) => {
        if (!location) {
          return;
        }
        this.loadGeoJSON(location);
    });

  }

  loadGeoJSON(location: ILocation): void {
    this.geoJsonLoader
      .loadGeoJSON(location, GeoJsonType.BATIMENTS)
      .subscribe(data => {
        console.log(data);
        L.geoJSON(data).addTo(this.map);
      });
  }
}
