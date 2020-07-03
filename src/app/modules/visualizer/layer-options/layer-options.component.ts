import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeoJsonType } from '../geo-json-loader/geo-json.type';

export interface LayerOptions {
  [key: string]: boolean;
}

@Component({
  selector: 'app-layer-options',
  templateUrl: './layer-options.component.html',
  styleUrls: ['./layer-options.component.css']
})
export class LayerOptionsComponent implements OnInit {
  @Output() valueChange = new EventEmitter<LayerOptions>();

  geoJsonTypes = Object.values(GeoJsonType);
  layerOptions: LayerOptions = {
    batiments:  true,
    communes: true,
  };


  constructor() { }

  ngOnInit(): void {
    this.valueChange.emit(this.layerOptions);
  }

  onChange(): void {
    this.valueChange.emit(this.layerOptions);
  }
}
