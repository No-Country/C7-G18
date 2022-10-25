import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/commons/services/cart.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit {
  
  formGroup!: FormGroup;
	disableButton = false;
  itemsCart = this._cartService.getItems();
  showSuccess!: any;
  public payPalConfig?: IPayPalConfig;

  constructor(	
    public _cartService:CartService,
    private _formBuilder: FormBuilder,
		private _alertify: AlertifyService,
		private router: Router
    ) { }
  private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
			phone: ['', Validators.required],
      adress: ['', Validators.required],
      reference: ['', Validators.required],
      note: ['']
		});
  }
  ngOnInit(): void {
    this._loadFormGroup();
    this.initConfig();
  }

  payPaypal(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value, 'conocimin')
    }
  }


  private initConfig(): void {
    const cartTotal=this._cartService.getTotal();
    
    const cartItemFormat=this._cartService.getItems().map(item => {
      const newObject= {
        name: item.name,
        quantity: item.quantity,
        category: item.nameCategory,
        unit_amount: {
          currency_code: 'USD',
          value: `${item.subtotal}`,
        },
      }
      return newObject
    })


    this.payPalConfig = {
      currency: 'EUR',
      clientId: `${environment.Client_ID}`,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${cartTotal}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${cartTotal}`,
                  },
                },
              },
              items: cartItemFormat,
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          //this.router.navigate(['']);
          console.log('Pago exito')
        }
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}


