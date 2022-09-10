import { Component, Input, OnInit } from '@angular/core';


interface Collaborator {
  name: string;
  picturePath: string;
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
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
  workWith: {[key: string]: string} = {
    'eng': 'I work with',
    'esp': 'Trabajo con',
    'cat': 'Treballe amb',
  };

  // Collaborators
  collaborators: Collaborator[] = [
    { name: 'Uppsala University', picturePath: 'assets/images/uu-logo.svg' },
    { name: 'Dédalo', picturePath: 'assets/images/dedalo-logo.svg' },
  ];

  @Input() language!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
