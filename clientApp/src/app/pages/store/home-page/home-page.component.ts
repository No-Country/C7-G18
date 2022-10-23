import { Component, OnInit, ViewChild } from '@angular/core';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CategoryService } from 'src/app/commons/services/category.service';
import { PetService } from 'src/app/commons/services/pet.service';
import { ProductService } from 'src/app/commons/services/product.service';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	
	constructor(
		private _productService:ProductService,
    	private _categoryService:CategoryService,
    	private _brandService:BrandService,
    	private _petService:PetService,
	) {}

	pets:CardDashboard[]=[]
  brands:CardDashboard[]=[]
  categories:CardDashboard[]=[]
  products:IProductClass[]=[]
  last8prods:IProductClass[]=[]
  first8prods:IProductClass[]=[]




	

	ngOnInit(): void {
	this._categoryService.getCategory().subscribe(data=>this.categories=data)
    this._brandService.getBrand().subscribe(data=>this.brands=data)
    this._petService.getPet().subscribe(data=>this.pets=data)
    this._productService.getProds().subscribe({
       next:data=>this.products=data,
       complete:()=>this.getProducts()
     })  
	}


	getProducts(){       
		this.products.forEach(product=> {
			 const dataCategory=this.categories.find(category=>category.id==product.category)
			 const dataBrand= this.brands.find(brand=>brand.id==product.brand)
			 const dataPet= this.pets.find(pet=>pet.id==product.pet)
			 
			product.nameCategory=dataCategory?.name;
			product.nameBrand=dataBrand?.name;
			product.namePet=dataPet?.name	 
		  });
		 this.last8prods=this.products.slice(this.products.length-8,this.products.length)
		 this.first8prods=this.products.slice(1,8)
	}



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


	
}
