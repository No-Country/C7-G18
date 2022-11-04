import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CategoryService } from 'src/app/commons/services/category.service';
import { PetService } from 'src/app/commons/services/pet.service';
import { SubcategoryService } from '../../../commons/services/subcategory.service';

@Component({
	selector: 'app-store-page',
	templateUrl: './store-page.component.html',
	styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {
	constructor(
		private _categoryService: CategoryService,
		private _subcategoryService: SubcategoryService,
		private _brandService: BrandService,
		private _petService: PetService,
		private _afs: AngularFirestore
	) {}

	pets: CardDashboard[] = [];
	brands: CardDashboard[] = [];
	categories: CardDashboard[] = [];
	subcategories: CardDashboard[] = [];
	products: IProductClass[] = [];

	isPet = false;
	pet: string | undefined;
	isBrand = false;
	brand: string | undefined;
	isCategory = false;
	category: string | undefined;
	isSubcategory = false;
	subcategory: string | undefined;

	ngOnInit(): void {
		this._categoryService.getCategory().subscribe((data) => (this.categories = data));
		this._brandService.getBrand().subscribe((data) => (this.brands = data));
		this._petService.getPet().subscribe((data) => (this.pets = data));
		this.prods();
	}

	prods() {
		this._afs
			.collection<IProductClass>('products')
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});

		this.isPet = false;
		this.isBrand = false;
		this.isCategory = false;
		this.isSubcategory = false;
	}

	paginat() {
		this.dataSource = new MatTableDataSource<IProductClass>(this.products);
		this.dataSource.paginator = this.paginator;
		this.paginator._intl.itemsPerPageLabel = 'Productos por página';
		this.obs = this.dataSource.connect();
	}

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource: MatTableDataSource<IProductClass>;
	obs: Observable<any>;

	categFilter(id: any) {
		this._afs
			.collection<IProductClass>('products', (ref) => ref.where('category', '==', id))
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});
		this._subcategoryService.getSubcategory(id).subscribe((subs) => (this.subcategories = subs));

		this.isPet = false;
		this.isBrand = false;
		this.isCategory = true;
		this.isSubcategory = false;

		this.category = this.categories.find((category) => category.id == id)?.name;
	}

	petFilter(id: any) {
		this._afs
			.collection<IProductClass>('products', (ref) => ref.where('pet', '==', id))
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});

		this.isPet = true;
		this.isBrand = false;
		this.isCategory = false;
		this.isSubcategory = false;

		this.pet = this.pets.find((pet) => pet.id == id)?.name;
	}

	brandFilter(id: any) {
		this._afs
			.collection<IProductClass>('products', (ref) => ref.where('brand', '==', id))
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});

		this.isPet = false;
		this.isBrand = true;
		this.isCategory = false;
		this.isSubcategory = false;

		this.brand = this.brands.find((brand) => brand.id == id)?.name;
	}

	subFilter(idSub: any) {
		this._afs
			.collection<IProductClass>('products', (ref) => ref.where('subcategory', '==', idSub))
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});

		this.isPet = false;
		this.isBrand = false;
		this.isCategory = true;
		this.isSubcategory = true;

		this.subcategory = this.subcategories.find((sub) => sub.id == idSub)?.name;
	}

	slider(event: any) {
		this._afs
			.collection<IProductClass>('products', (ref) => ref.where('price', '<', event.value))
			.valueChanges()
			.subscribe((prods) => {
				this.products = prods;
				this.paginat();
			});
	}

	//slider
	max = 500;
	min = 0;
	step = 10;
	thumbLabel = true;
	value = this.max;
	tickInterval = 1;

	openNav() {
		document.getElementById('sidenav')!.style.width = '250px';
	}

	closeNav() {
		document.getElementById('sidenav')!.style.width = '0';
	}
}
