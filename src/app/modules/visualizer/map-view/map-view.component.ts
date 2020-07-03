import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import L from 'leaflet';
import { GeoJsonLoaderService } from '../geo-json-loader/geo-json-loader.service';
import { LocationFacadeService } from '../../location/location-facade.service';
import { ILocation } from '../../location/location-state.service';
import { GeoJsonType } from '../geo-json-loader/geo-json.type';
import { availableLocations } from '../location-selector/available-locations';
import { LayerOptions } from '../layer-options/layer-options.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnChanges {
  @Input() layerOptions: LayerOptions;

  map: L.Map;
  layers: {
    [key: string]: L.Layer
  } = {};
  currentLocation: ILocation;

  styles = {
    batiments: {
      color: 'blue',
      weight: 1,
      opacity: 0.5
    },
    communes: {
      color: 'red',
      weight: 5,
      opacity: 0.5,
      fillOpacity: 0
    },
    feuilles: {
      color: 'pink',
      weight: 1,
      opacity: 0.5
    },
    parcelles: {
      color: 'orange',
      weight: 1,
      opacity: 0.5
    },
    prefixes_sections: {
      color: 'yellow',
      weight: 1,
      opacity: 0.5
    },
    sections: {
      color: 'purple',
      weight: 2,
      opacity: 0.5
    }
  };
  constructor(
    private readonly geoJsonLoader: GeoJsonLoaderService,
    private readonly locationFacade: LocationFacadeService
  ) { }

  ngOnInit(): void {
    this.initMap();
    this.initLocationSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.layerOptions) {
      this.updateDisplay();
    }
  }

  resetPosition(): void {
    this.map.fitBounds(this.currentLocation.bounds);
  }

  initMap(): void {
    this.map = L.map('leafletmap').setView(availableLocations[0].bounds[0], 15);
    this.map.fitBounds(availableLocations[0].bounds);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Map'
    }).addTo(this.map);

    this.updateLocation(availableLocations[0]);
  }

  removeLayersFromMap(): void {
    Object.keys(this.layers)
      .forEach(key => {
        try {
          this.map.removeLayer(this.layers[key]);
        }
        catch (e) {
          // Not displayed
          console.log(e);
        }
      });
  }

  resetLayers(): void {
    this.removeLayersFromMap();
    this.layers = {};
  }

  updateDisplay(): void {
    this.removeLayersFromMap();
    Object.values(GeoJsonType).forEach(geoType => {
      if (this.layerOptions[geoType] && this.layers[geoType]) {
        // We display this layer
        this.layers[geoType].addTo(this.map);
      }
    });
  }

  loadGeoJSONs(location: ILocation): void {
    const promises = [];
    Object.values(GeoJsonType).forEach((geoType, i) => {
      const style = this.styles[geoType];
      const promise = this.loadGeoJSON(location, geoType).toPromise();
      promise.then(data => {
        this.layers[geoType] = L.geoJSON(data, {style});
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      this.updateDisplay();
    });
  }

  loadGeoJSON(location: ILocation, geoType: GeoJsonType): Observable<any> {
    return this.geoJsonLoader
      .loadGeoJSON(location, geoType);
  }

  private initLocationSubscription(): void {
    // TODO: destroy
    this.locationFacade
      .getLocation()
      .subscribe((location: ILocation) => {
        if (!location) {
          return;
        }
        this.updateLocation(location);
      });
  }

  updateLocation(location: ILocation): void {
    this.resetLayers();
    this.loadGeoJSONs(location);

    this.map.fitBounds(location.bounds);
    this.currentLocation = location;
  }
}
