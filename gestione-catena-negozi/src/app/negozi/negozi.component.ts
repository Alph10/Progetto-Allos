import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';
import { Dipendente } from '../models/Dipendente';
import { DipendenteService } from '../services/dipendente.service';
import { Giacenza } from '../models/Giacenza';
import { GiacenzaService } from '../services/giacenza.service';

@Component({
  selector: 'app-negozio',
  templateUrl: './negozi.component.html',
  styleUrls: ['./negozi.component.css']
})
export class NegoziComponent implements OnInit {

  negozi: Negozio[];
  clickedNegozio: Negozio;

  dipendenti: Dipendente[];

  giacenze: Giacenza[];

  constructor(public negService: NegozioService, public dipService: DipendenteService, public giacService: GiacenzaService, private router: Router) {
    this.negozi = [];
    this.clickedNegozio = new Negozio;

    this.dipendenti = [];

    this.giacenze = [];
  }

  ngOnInit(): void {
    this.negService.getNegozi().subscribe((response: Negozio[]) => {
      if (response && response.length > 0) {
        this.negozi = response;
      }
    });

    this.dipService.getDipendenti().subscribe((response: Dipendente[]) => {
      if (response && response.length > 0) {
        this.dipendenti = response;
      }
    });

    this.giacService.getGiacenze().subscribe((response: Giacenza[]) => {
      if (response && response.length > 0) {
        this.giacenze = response;
      }
    });
  }

  modificaNegozio(neg: Negozio) {
    this.clickedNegozio = neg;
    this.router.navigate(['modifica-negozio/' + this.clickedNegozio.id_negozio]);
  }

  eliminaNegozio(id_negozio:number, i:number) {
    this.negService.deleteNegozio(id_negozio).subscribe( (response) => {
      this.negozi.splice(i, 1);

      // ON DELETE CASCADE non funziona nell'applicazione (anche se inviando un comando DELETE al database va), quindi lo aggiungo col codice
      let onDeleteCascadeDipendenti: Dipendente[];
      onDeleteCascadeDipendenti = this.dipendenti.filter( dipendente => { return dipendente.id_negozio == id_negozio } );

      onDeleteCascadeDipendenti.forEach(dipendente => {
        this.dipService.deleteDipendente(dipendente.id_dipendente).subscribe( (response) => {
          this.dipendenti.splice(i, 1);
        });
      });

      let onDeleteCascadeGiacenze: Giacenza[];
      onDeleteCascadeGiacenze = this.giacenze.filter( giacenza => { return giacenza.id_negozio == id_negozio } );

      onDeleteCascadeGiacenze.forEach(giacenza => {
        this.giacService.deleteGiacenza(giacenza.id_giacenza).subscribe( (response) => {
          this.giacenze.splice(i, 1);
        });
      });
      
    });
  }

  aggiungiNegozio() {
    this.router.navigate(['/aggiungi-negozio']);
  }

  Dipendenti(neg: Negozio) {
    this.clickedNegozio = neg;
    this.router.navigate(['/Dipendenti/'+this.clickedNegozio.id_negozio]);
  }
}
