import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CardDashboard } from '../../../../../commons/components/card-dashboard/card-dashboard';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-marcas',
	templateUrl: './marcas.component.html',
	styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {
	@ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
	brands: CardDashboard[] = [];
	constructor(private brandService: BrandService, private firestore2: AngularFirestore) {}

	tinySliderConfig: TinySliderSettings = {
		gutter: 8,
		items: 6,
		mouseDrag: true,
		autoplay: true,
		speed: 400,
		responsive: {
			'1200': {
				items: 6
			},
			'1000': {
				items: 5
			},
			'870': {
				items: 4
			},
			'550': {
				items: 3
			},
			'400': {
				items: 2
			},
			'200': {
				items: 2
			}
		}
	};

	ngOnInit(): void {
		this.brandService.getBrand().subscribe({
			next: (brands) => {
				(this.brands = brands), console.log('next', brands);
			},
			error: (e) => {
				console.log('err');
			}
		});
	}
}
