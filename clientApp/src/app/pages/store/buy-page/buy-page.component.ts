import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/commons/services/cart.service';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { IPayPalConfig, ICreateOrderRequest, IOnInitCallbackActions } from 'ngx-paypal';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit,  AfterViewInit {
  
  formGroup!: UntypedFormGroup;
	disableButton = false;
  itemsCart = this._cartService.getItems();
  showSuccess!: any;
  public payPalConfig?: IPayPalConfig;

  constructor(	
    public _cartService:CartService,
    private _formBuilder: UntypedFormBuilder,
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
  cartTotal=0;
  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any) || [];
    this._loadFormGroup();
  }

  ngAfterViewInit() {
    this.initConfig();
  }

  private initConfig(): void {
        
    const cartItemFormat=this._cartService.getItems().map(item => {
      const newObject= {
        name: item.name,
        quantity: item.quantity,
        category: item.nameCategory,
        unit_amount: {
          currency_code: 'USD',
          value: item.subtotal.toString(),
        },
      }
      return newObject
    })


    /*this.payPalConfig = {
      currency: 'USD',
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
    };*/
     console.log(this.cartTotal.toString(),'total')
     let actionStatus: IOnInitCallbackActions;
      this.payPalConfig = {
      currency: 'USD',
      clientId: `${environment.Client_ID}`,
      onInit:(data, actions)=>{
        actions.disable();
        actionStatus = actions;
      },
      
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '220',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '220'
                }
              }
            },
            items:  [{
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                  currency_code: 'EUR',
                  value: '220',
              },
          }]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal'
      },
      onApprove: (data, actions) => {
        console.log(data.orderID,'este es el id de orden')
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        this._alertify.error('Al parecer hubo un error')
      },
      onClick: (data, actions) => {
        if(this.formGroup.valid){
           actionStatus.enable();
        }else {
          this._alertify.error('Debe llenar los datos del formulario')
           actionStatus.disable();
        }
      },
    };
    }

  

}


