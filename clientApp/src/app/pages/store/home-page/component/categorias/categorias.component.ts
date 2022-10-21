import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { pets } from 'src/app/commons/mockups/pets';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  @ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
  data=pets; 
  constructor() { }
  tinySliderConfig: TinySliderSettings = {
		gutter: 8,
		items: 5,
		mouseDrag: true,
		responsive: {
      "1200": {
        "items": 5,
      },
		  "1000": {
        "items": 4,
      },
      "840": {
        "items": 3,
      },
      "430": {
        "items": 2,
      },
      "300": {
        "items": 1,
      }
		}
	};
  ngOnInit(): void {
  }

}
