import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NegoziComponent } from './negozi/negozi.component';
import { ArticoliComponent } from './articoli/articoli.component';
import { HomeComponent } from './home/home.component';
import { ModificaArticoloComponent } from './modifica-articolo/modifica-articolo.component';
import { ModificaNegozioComponent } from './modifica-negozio/modifica-negozio.component';
import { AggiungiNegozioComponent } from './aggiungi-negozio/aggiungi-negozio.component';
import { AggiungiArticoloComponent } from './aggiungi-articolo/aggiungi-articolo.component';
import { DipendentiComponent } from './dipendenti/dipendenti.component';
import { AggiungiDipendenteComponent } from './aggiungi-dipendente/aggiungi-dipendente.component';
import { ModificaDipendenteComponent } from './modifica-dipendente/modifica-dipendente.component';
import { GiacenzeComponent } from './giacenze/giacenze.component';
import { ModificaGiacenzaComponent } from './modifica-giacenza/modifica-giacenza.component';
import { AggiungiGiacenzaComponent } from './aggiungi-giacenza/aggiungi-giacenza.component';

@NgModule({
  declarations: [
    AppComponent,
    NegoziComponent,
    ArticoliComponent,
    HomeComponent,
    ModificaArticoloComponent,
    ModificaNegozioComponent,
    AggiungiNegozioComponent,
    AggiungiArticoloComponent,
    DipendentiComponent,
    AggiungiDipendenteComponent,
    ModificaDipendenteComponent,
    GiacenzeComponent,
    ModificaGiacenzaComponent,
    AggiungiGiacenzaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
