import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dipendente } from '../models/Dipendente';
import { DipendenteService } from '../services/dipendente.service';
import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-dipendente',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent implements OnInit {

  dipendenti: Dipendente[];
  clickedDipendente: Dipendente;

  negozio: Negozio;

  id_negozio: Number;

  constructor(public dipService: DipendenteService, public negService: NegozioService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.dipendenti = [];
    this.clickedDipendente = new Dipendente;

    this.negozio = new Negozio;

    this.id_negozio = Number(this.activatedRoute.snapshot.paramMap.get('id_negozio'));
  }

  ngOnInit(): void {
    let id_negozio = this.activatedRoute.snapshot.paramMap.get('id_negozio');

    this.dipService.getDipendentiNegozio(Number(id_negozio)).subscribe((response: Dipendente[]) => {
      if (response && response.length > 0) {
        this.dipendenti = response;
      }
    });

    this.negService.getNegozio(Number(id_negozio)).subscribe( (response: Negozio) => {
      this.negozio = response;
    });
  }

  modificaDipendente(neg: Dipendente) {
    this.clickedDipendente = neg;
    this.router.navigate(['modifica-dipendente/' + this.clickedDipendente.id_dipendente]);
  }

  eliminaDipendente(id_articolo:number, i:number) {
    this.dipService.deleteDipendente(id_articolo).subscribe( (response) => {
      this.dipendenti.splice(i, 1);
    });
  }

  aggiungiDipendente() {
    let id_negozio = this.activatedRoute.snapshot.paramMap.get('id_negozio');
    this.router.navigate(['/aggiungi-dipendente/' + id_negozio]);
  }

  TornaAlNegozio() {
    this.router.navigate(['/modifica-negozio/'+this.id_negozio]);
  }

  TornaAiNegozi() {
    this.router.navigate(['/Negozi']);
  }

}
