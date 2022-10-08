import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/commons/components/login/login.component';
import { ContactoComponent } from 'src/app/commons/components/contacto/contacto.component';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	constructor(private _matDialog: MatDialog) {}

	panelOpenState: boolean = false;

	togglePanel() {
    	this.panelOpenState = !this.panelOpenState
	}

	openModalLogin() {
		if (screen.width < 500) {
			this._matDialog.open(LoginComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		}else{			
			this._matDialog.open(LoginComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
		}

	escribenos() {
		
		if (screen.width < 500) {
			this._matDialog.open(ContactoComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		}else{			
			this._matDialog.open(ContactoComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}

	esMas850: boolean = false;

	ngOnInit(): void {}
}
