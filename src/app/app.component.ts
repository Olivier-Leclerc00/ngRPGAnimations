import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { jello, pulse, shakeX } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: 1}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: 0.6, scale:4.5}}))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {params: {timing: 1}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  css_hit = false;
  css_bounce = false;
  ng_death = 0;
  ng_attack = 0;
  ng_preAttack = 0;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();
    this.css_bounce =true;
    setTimeout(() => this.css_bounce = false, 1000);
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime()
    // TODO 2e animation angular en même temps
    this.ng_death++;
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
    this.ng_preAttack++;
    setTimeout(() => this.ng_attack++, 600);
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, 600);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }
}
