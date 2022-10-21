import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

@Component({
	selector: 'app-banner-principal',
	templateUrl: './banner-principal.component.html',
	styleUrls: ['./banner-principal.component.scss']
})
export class BannerPrincipalComponent implements OnInit {
	@ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
	constructor() {}
	
	tinySliderConfig: TinySliderSettings = {
		items: 1,
		mouseDrag: true,
		autoplay: true,
		speed: 400,
	};

	ngOnInit(): void {}
}
