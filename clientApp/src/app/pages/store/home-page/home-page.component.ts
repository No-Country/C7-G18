import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/commons/components/card-product';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { ProductService } from 'src/app/commons/services/product.service';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	topNewProducts:IProductClass[]=[];
	cardsMasVendidos: IProductClass[] = [];

	constructor(private _productService:ProductService,) {}

	@ViewChild('tinySlider', { static: false }) tinySlider: TinySliderInstance;
	public tinySliderConfig: TinySliderSettings = {
		gutter: 5,
		items: 4,
		mouseDrag: true,
    	nav:true,
		responsive: {
			"1200": {
			  "items": 4,
			},
			"910": {
				"items": 3,
			  },
			"700": {
				"items": 2,
			  },
			"300": {
			  "items": 1,
			},
			"200": {
			  "items": 1,
			}
		  },
	};

	ngOnInit(): void {
		
	}

	cards: IProductClass[] = [
		{
			id:'1',
			img: 'assets/images/image 17.svg',
			name: 'prueba',
			price: 19.99,
			meGusta: false,
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ipsum perspiciatis atque laudantium sint nobis laboriosam pariatur eaque facilis saepe nemo quam, placeat optio temporibus ex odio eligendi! Eaque, nisi.',
			brand: 'DogChow',
			category: 'Alimentación',
			subcategory: 'Croquetas',
			pet: 'Gatos'
		},
		{
			id:'2',
			img: 'assets/images/image 65.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 15.99,
			meGusta: true,
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ipsum perspiciatis atque laudantium sint nobis laboriosam pariatur eaque facilis saepe nemo quam, placeat optio temporibus ex odio eligendi! Eaque, nisi.',
			brand: 'CatChow',
			category: 'Alimentación',
			subcategory: 'Balanceado',
			pet: 'Gatos'
		},
		{
			id:'3',
			img: 'assets/images/image 17.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 9.99,
			meGusta: false,
			discount: 5.99,
			nuevo: true,
		},
		{
			id:'4',
			img: 'assets/images/image 17.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 19.99,
			meGusta: false,
			nuevo: true,
		},
		{
			id:'5',
			img: 'assets/images/image 65.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 15.99,
			meGusta: false,
			discount: 12.99,
			nuevo: true,
		},
		{
			id:'6',
			img: 'assets/images/image 17.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 9.99,
			meGusta: false,
		},
		{
			id:'7',
			img: 'assets/images/image 17.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 9.99,
			meGusta: false,
			discount: 5.99,
			nuevo: true,
		},
		{
			id:'8',
			img: 'assets/images/image 17.svg',
			name: 'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
			price: 19.99,
			meGusta: false,
		},
	];
}
