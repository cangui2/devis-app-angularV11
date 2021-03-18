import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DevisComponent} from './devis/devis.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'devis', component: DevisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
