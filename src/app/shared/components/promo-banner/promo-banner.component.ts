import { Component, OnDestroy, OnInit, signal } from '@angular/core';

interface PromoBanner {
  image: string;
  mobileImage: string;
  alt: string;
}

@Component({
  selector: 'app-promo-banner',
  imports: [],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss',
})
export class PromoBannerComponent implements OnInit, OnDestroy {
  readonly autoplayDelay = 5000; // 5 segundos

  readonly currentIndex = signal(0);

  readonly banners: PromoBanner[] = [
    {
      image: 'assets/images/promo-combo-lotero.png',
      mobileImage: 'assets/images/promo-combo-lotero-mobile.png',
      alt: 'Combo Lotero, promoción 1',
    },
    {
      image: 'assets/images/promo-combo-lotero.png',
      mobileImage: 'assets/images/promo-combo-lotero-mobile.png',
      alt: 'Combo Lotero, promoción 2',
    },
    {
      image: 'assets/images/promo-combo-lotero.png',
      mobileImage: 'assets/images/promo-combo-lotero-mobile.png',
      alt: 'Combo Lotero, promoción 3',
    },
  ];

  private autoplayId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  goToSlide(index: number): void {
    if (index < 0 || index >= this.banners.length) {
      return;
    }

    this.currentIndex.set(index);
    this.restartAutoplay();
  }

  private nextSlide(): void {
    if (this.banners.length <= 1) {
      return;
    }

    this.currentIndex.update((index) => (index + 1) % this.banners.length);
  }

  private startAutoplay(): void {
    if (this.banners.length <= 1 || this.autoplayId !== null) {
      return;
    }

    this.autoplayId = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  private stopAutoplay(): void {
    if (this.autoplayId === null) {
      return;
    }

    clearInterval(this.autoplayId);
    this.autoplayId = null;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}
