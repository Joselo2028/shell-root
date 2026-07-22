import { Component, ElementRef, ViewChild } from '@angular/core';

import { ButtonComponent } from '../button/button.component';

interface VideoLotteryGame {
  name: string;
  image: string;
}

@Component({
  selector: 'app-lottery-video-section',
  imports: [ButtonComponent],
  templateUrl: './lottery-video-section.component.html',
  styleUrl: './lottery-video-section.component.scss',
})
export class LotteryVideoSectionComponent {
  @ViewChild('carousel')
  private carousel?: ElementRef<HTMLDivElement>;

  readonly games: VideoLotteryGame[] = [
    {
      name: 'Joyas del imperio',
      image: 'assets/images/video-loterias-card.png',
    },
    {
      name: 'Joyas del imperio',
      image: 'assets/images/video-loterias-card.png',
    },
    {
      name: 'Joyas del imperio',
      image: 'assets/images/video-loterias-card.png',
    },
    {
      name: 'Joyas del imperio',
      image: 'assets/images/video-loterias-card.png',
    },
    {
      name: 'Joyas del imperio',
      image: 'assets/images/video-loterias-card.png',
    },
  ];

  scrollPrevious(): void {
    this.scrollCarousel(-1);
  }

  scrollNext(): void {
    this.scrollCarousel(1);
  }

  private scrollCarousel(direction: -1 | 1): void {
    const carouselElement = this.carousel?.nativeElement;

    if (!carouselElement) {
      return;
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      carouselElement.scrollBy({
        left: carouselElement.clientWidth * direction,
        behavior: 'smooth',
      });

      return;
    }

    const firstCard = carouselElement.querySelector<HTMLElement>('.lottery-video-section__game');

    if (!firstCard) {
      return;
    }

    const track = carouselElement.querySelector<HTMLElement>('.lottery-video-section__track');

    const gap = track ? Number.parseFloat(getComputedStyle(track).gap) || 0 : 0;

    const distance = firstCard.offsetWidth + gap;

    carouselElement.scrollBy({
      left: distance * direction,
      behavior: 'smooth',
    });
  }
}
