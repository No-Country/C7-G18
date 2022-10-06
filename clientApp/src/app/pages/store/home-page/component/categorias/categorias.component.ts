import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['../../../../../../../node_modules/keen-slider/keen-slider.min.css',
  './categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  slider!: KeenSliderInstance

  ngAfterViewInit() {
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
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }


}
