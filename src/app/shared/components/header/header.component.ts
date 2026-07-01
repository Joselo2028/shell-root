import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, HamburgerButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
