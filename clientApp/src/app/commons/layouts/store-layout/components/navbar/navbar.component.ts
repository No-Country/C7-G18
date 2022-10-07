import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginComponent } from 'src/app/commons/components/login/login.component';
import { ContactoComponent } from 'src/app/commons/components/contacto/contacto.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	constructor(private _matDialog: MatDialog, ) {}

	openModalLogin() {
		if (screen.width < 500) {
			this._matDialog.open(LoginComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		}


		this._matDialog.open(LoginComponent, {
			// maxWidth: '700vw',
			width: '500px',
			maxHeight: '670px'
		});
	}

	contactanos(){

		// this.matDialogRef.close();

		this._matDialog.open(ContactoComponent, {
			// maxWidth: '700vw',
			width: '500px',
			maxHeight: '670px'
		});

	}

  esMas850:boolean=false

	ngOnInit(): void {}
}
