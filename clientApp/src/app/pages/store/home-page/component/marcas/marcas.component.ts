import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { Observable, of } from 'rxjs';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CardDashboard } from '../../../../../commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: [
  './marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  brands: Observable<CardDashboard[]>
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>
  
  slider!: KeenSliderInstance 
  doResize: boolean = false
  constructor(private brandService:BrandService) {
    
   }

  ngOnInit(): void {
    this.brandService.getBrand().subscribe({
      next: (brands)=>{this.brands=of(brands), console.log('next', brands); this.silder()}
    })
  }
  

  silder() {
    console.log('slider iniciado')
    const animation = { duration: 25000, easing: (t: any) => t }
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      renderMode: "performance",
      drag: true,
      initial: 6,
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
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },

    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }


}
