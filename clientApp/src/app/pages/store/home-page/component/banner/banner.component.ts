import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { offerData } from 'src/app/commons/mockups/offer';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: [  './banner.component.scss']
})
export class BannerComponent implements OnInit {
	@ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;

	tinySliderConfig: TinySliderSettings = {
		gutter: 10,
		items: 4,
		mouseDrag: true,
    responsive: {
      "900": {
        "items": 4,
      },
      "610": {
        "items": 3,
      },
      "300": {
        "items": 2,
      },
      "200": {
        "items": 1,
      }
    },
	};
  constructor() { }
  data=offerData; 
  ngOnInit(): void { 
  }

}
