import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';


interface Collaborator {
  name: {[key: string]: string};
  picturePath: string;
  url: string;
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoverComponent implements OnInit {

  // Texts
  catchphrase: {[key: string]: string} = {
    'eng': '(Hopefully) changing the world one project at a time',
    'esp': 'Cambiando el mundo proyecto a proyecto',
    'cat': 'Canviant el mon projecte a projecte',
  };
  learnMore: {[key: string]: string} = {
    'eng': 'Learn more',
    'esp': 'Saber más',
    'cat': 'Saber més',
  };
  comingSoon: {[key: string]: string} = {
    'eng': 'Coming soon...',
    'esp': 'Próximamente...',
    'cat': 'Pròximament...',
  };
  workWith: {[key: string]: string} = {
    'eng': 'I work with',
    'esp': 'Trabajo con',
    'cat': 'Treballe amb',
  };

  // Collaborators
  collaborators: Collaborator[] = [
    {
      name: {
        'eng': 'Uppsala University',
        'esp': 'Universidad de Uppsala',
        'cat': "Universitat d'Uppsala"
      },
      picturePath: 'assets/images/uu-logo.svg',
      url: 'https://www.uu.se/en'
    },
    {
      name: {
        'eng': 'Dédalo',
        'esp': 'Dédalo',
        'cat': "Dédalo"
      },
      picturePath: 'assets/images/dedalo-logo.svg',
      url: 'https://dedalo.dev'
    },
  ];

  @Input() language!: string;

  constructor() { }

  ngOnInit(): void {
  }

  swapLMandCS() {
    let temp: {[key: string]: string} = this.comingSoon;
    this.comingSoon = this.learnMore;
    this.learnMore = temp;
  }

}
