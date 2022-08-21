import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ArticoliComponent } from './articoli/articoli.component';
import { ModificaArticoloComponent } from './modifica-articolo/modifica-articolo.component';
import { AggiungiArticoloComponent } from './aggiungi-articolo/aggiungi-articolo.component';
import { NegoziComponent } from './negozi/negozi.component';
import { ModificaNegozioComponent } from './modifica-negozio/modifica-negozio.component';
import { AggiungiNegozioComponent } from './aggiungi-negozio/aggiungi-negozio.component';
import { DipendentiComponent } from './dipendenti/dipendenti.component';
import { AggiungiDipendenteComponent } from './aggiungi-dipendente/aggiungi-dipendente.component';
import { ModificaDipendenteComponent } from './modifica-dipendente/modifica-dipendente.component';
import { GiacenzeComponent } from './giacenze/giacenze.component';
import { AggiungiGiacenzaComponent } from './aggiungi-giacenza/aggiungi-giacenza.component';
import { ModificaGiacenzaComponent } from './modifica-giacenza/modifica-giacenza.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path:'Home', component: HomeComponent },
  
  { path:'Negozi', component: NegoziComponent },
  { path:'modifica-negozio/:id_negozio', component: ModificaNegozioComponent },
  { path:'aggiungi-negozio', component: AggiungiNegozioComponent },

  { path:'Articoli', component: ArticoliComponent },
  { path:'modifica-articolo/:id_articolo', component: ModificaArticoloComponent },
  { path:'aggiungi-articolo', component: AggiungiArticoloComponent },


  { path:'Dipendenti/:id_negozio', component: DipendentiComponent },
  { path:'aggiungi-dipendente/:id_negozio', component: AggiungiDipendenteComponent },
  { path:'modifica-dipendente/:id_dipendente', component: ModificaDipendenteComponent },

  { path:'Giacenze/:id_negozio', component: GiacenzeComponent },
  { path:'aggiungi-giacenza/:id_negozio', component: AggiungiGiacenzaComponent },
  { path:'modifica-giacenza/:id_giacenza', component: ModificaGiacenzaComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
