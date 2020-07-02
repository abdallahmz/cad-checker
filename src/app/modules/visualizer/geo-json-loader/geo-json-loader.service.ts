import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILocation } from '../../location/location-state.service';
import { GeoJSON } from 'leaflet';
import { Observable } from 'rxjs';
import { GeoJsonType } from './geo-json.type';

@Injectable({
  providedIn: 'root'
})
export class GeoJsonLoaderService {

  constructor(private readonly httpClient: HttpClient) { }

  loadGeoJSON(location: ILocation, geoJsonType: GeoJsonType): Observable<any> {
    // const url = './assets/geojson/' +
    const url = './assets/geojson/' +
      location.commune + '/' +
      location.departement + '/' +
      'cadastre-' +
      location.departement + '-' +
      geoJsonType +
      '.json';
    return this.httpClient.get<any>(
      url,
      {headers: { 'Accept-Encoding': 'gzip' }}
    );
  }
}
