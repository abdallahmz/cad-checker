import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationFacadeService } from '../../location/location-facade.service';
import { LayerOptions } from '../layer-options/layer-options.component';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  layerOptions: LayerOptions = {};

  constructor(
  ) { }

  ngOnInit(): void {
  }

  layerOptionsChange($event: LayerOptions): void {
    this.layerOptions = JSON.parse(JSON.stringify($event));
  }
}
