import { Component, Input, OnInit } from '@angular/core';

import { SUPPORTED_LANGS } from '../data';

const CATCHPHRASE_TEXTS: {[key: string]: string} = {
  'eng': '(Hopefully) changing the world one project at a time',
  'esp': 'Cambiando el mundo proyecto a proyecto',
  'cat': 'Canviant el mon projecte a projecte',
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  @Input()
  get language(): string { return this._language; }
  set language(lang: string) {
    this._language = lang;
    this.setTexts();
  }
  private _language!: string;
  catchphrase_text!: string;

  constructor() { }

  ngOnInit(): void {
    this.setTexts();
  }

  /**
   * Set texts in the component according to the language
   */
  private setTexts(): void {
    this.catchphrase_text = CATCHPHRASE_TEXTS[this._language];
  }

}
