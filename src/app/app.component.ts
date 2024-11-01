import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, jello, pulse, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: 1}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: 0.3, scale:4.5}}))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {params: {timing: 1}}))]),
    trigger('bounce', [transition(':increment', useAnimation(bounce, {params: {timing: 1}}))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {params: {timing: 0.75}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  css_hit = false;
  css_bounce = false;
  css_vibrate = false;
  css_rotateC = false;
  css_rotateHT = false;
  ng_death = 0;
  ng_attack = 0;
  ng_preAttack = 0;
  ng_bounce = 0;
  ng_flip = 0;

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
    setTimeout(() => {
      this.ng_attack++;
      setTimeout(() => {
        this.css_vibrate = true
        setTimeout(() => this.css_vibrate = false, 200);
      }, 600);
    }, 600);
    
    //setTimeout(() => this.css_vibrate = false, 600);
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, 600);
  }

  async bounceShakeFlip(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.ng_bounce++;
    await lastValueFrom(timer(1000));
    this.ng_death++;
    await lastValueFrom(timer(750));
    this.ng_flip++;
  }

  infiniteSpin(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.rotateCenter();
  }

  rotateCenter(){
    this.css_rotateC = true;
    setTimeout(() => {
      this.css_rotateC = false;
      this.rotateTop();
    }, 800);
  }

  rotateTop(){
    this.css_rotateHT = true;
    setTimeout(() => {
      this.css_rotateHT = false;
      this.rotateCenter();
    }, 700);
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
