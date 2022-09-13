import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ComingSoonComponent extends LanguageComponent {

  csText: {[key: string]: string} = {
    'eng': 'Coming soon...',
    'esp': 'Próximamente...',
    'cat': 'Pròximament...'
  }

}
