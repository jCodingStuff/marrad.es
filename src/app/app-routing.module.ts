import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverComponent } from './cover/cover.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: CoverComponent },
  { path: 'coming-soon', component: ComingSoonComponent },

  // Wildcard for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
