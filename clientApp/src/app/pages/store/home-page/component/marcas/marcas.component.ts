import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { BrandService } from 'src/app/commons/services/brand.service';
import { CardDashboard } from '../../../../../commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['../../../../../../../node_modules/keen-slider/keen-slider.min.css',
  './marcas.component.scss']
})
export class MarcasComponent implements OnInit , AfterViewInit{

  brands:CardDashboard[]

  constructor(private brandService:BrandService) {
     
   }

  ngOnInit(): void {
    this.brandService.getBrand().subscribe({
    next: brands=>this.brands=brands,
    complete:()=>{console.log(this.brands)}
   })
  }


  
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance

  ngAfterViewInit() {
    console.log('slider iniciado')
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 600px)": {
          slides: { perView: 3, spacing: 5 },
        },
        "(min-width: 800px)": {
          slides: { perView: 4, spacing: 10 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 5, spacing: 10 },
        },
      },
      slides: { perView: 1 },
    
      loop: true,
    },
    [
      (slider) => {
        let timeout:any
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ])
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }


}
