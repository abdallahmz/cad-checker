import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { MapViewComponent } from './map-view/map-view.component';
import { GeoJsonLoaderService } from './geo-json-loader/geo-json-loader.service';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { LayerOptionsComponent } from './layer-options/layer-options.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [VisualizerComponent, MapViewComponent, LocationSelectorComponent, LayerOptionsComponent],
    exports: [
        VisualizerComponent
    ],
    providers: [
      GeoJsonLoaderService
    ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ]
})
export class VisualizerModule { }
