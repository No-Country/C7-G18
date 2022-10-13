import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { Product } from 'src/app/commons/components/card-product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../../../../node_modules/keen-slider/keen-slider.min.css',
    './home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    for (const card of this.cards) {
      if(card.sold >= 30){
        this.cardsMasVendidos.push(card)
      }
    }
  }


  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>
  @ViewChild("sliderRef1") sliderRef1!: ElementRef<HTMLElement>

  currentSlide: number = 1
  currentSlide1: number = 1
  dotHelper: Array<Number> = []
  dotHelper1: Array<Number> = []
  slider!: KeenSliderInstance
  slider1!: KeenSliderInstance

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      breakpoints: {
        "(min-width: 700px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1100px)": {
          slides: { perView: 3, spacing: 0 },
        },
        "(min-width: 1300px)": {
          slides: { perView: 4, spacing: 0 },
        },
      },
      slides: { perView: 1 },
      initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]


      this.slider1 = new KeenSlider(this.sliderRef1.nativeElement, {
        breakpoints: {
          "(min-width: 700px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 1100px)": {
            slides: { perView: 3, spacing: 0 },
          },
          "(min-width: 1300px)": {
            slides: { perView: 4, spacing: 0 },
          },
        },
        slides: { perView: 1 },
        initial: this.currentSlide1,
          slideChanged: (s) => {
            this.currentSlide1 = s.track.details.rel
          },
        })
        this.dotHelper1 = [
          ...Array(this.slider1.track.details.slides.length).keys(),
        ]
    }
  

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.slider1) this.slider1.destroy()
  }


  cardsMasVendidos:Product[]=[]

  cards:Product[]=[
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:19.99,
      meGusta:false,
      sold:35
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:true,
      sold:5
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      discount:5.99,
      nuevo:true,
      sold:40
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:19.99,
      meGusta:false,
      nuevo:true,
      sold:10
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:false,
      discount:12.99,
      nuevo:true,
      sold:1
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      sold:15
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      discount:5.99,
      nuevo:true,
      sold:48
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:19.99,
      meGusta:false,
      sold:4
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:false,
      discount:12.99,
      nuevo:true,
      sold:100
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      sold:37
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:false,
      discount:12.99,
      nuevo:true,
      sold:100
    },
    {
      img:'assets/images/image 17.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      sold:37
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:false,
      discount:12.99,
      nuevo:true,
      sold:100
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:9.99,
      meGusta:false,
      sold:37
    },
    {
      img:'assets/images/image 65.svg',
      name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      price:15.99,
      meGusta:false,
      discount:12.99,
      nuevo:true,
      sold:100
    },
  ]
}
