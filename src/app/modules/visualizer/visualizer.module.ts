import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { MapViewComponent } from './map-view/map-view.component';
import { GeoJsonLoaderService } from './geo-json-loader/geo-json-loader.service';



@NgModule({
    declarations: [VisualizerComponent, MapViewComponent],
    exports: [
        VisualizerComponent
    ],
    providers: [
      GeoJsonLoaderService
    ],
    imports: [
        CommonModule
    ]
})
export class VisualizerModule { }
