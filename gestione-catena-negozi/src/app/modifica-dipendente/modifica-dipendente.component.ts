import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dipendente } from '../models/Dipendente';
import { DipendenteService } from '../services/dipendente.service';

@Component({
  selector: 'app-modifica-dipendente',
  templateUrl: './modifica-dipendente.component.html',
  styleUrls: ['./modifica-dipendente.component.css']
})
export class ModificaDipendenteComponent implements OnInit {

  dipendente: Dipendente;
  dipendenti: Dipendente[];

  numeroMatricolaDipendenteDuplicato: boolean;

  constructor(public dipService: DipendenteService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.dipendente = new Dipendente();
    this.dipendenti = [];

    this.numeroMatricolaDipendenteDuplicato = false;
  }

  ngOnInit(): void {
    let id_dipendente = this.activatedRoute.snapshot.paramMap.get('id_dipendente');

    this.dipService.getDipendente(Number(id_dipendente)).subscribe( (response: Dipendente) => {
      this.dipendente = response;

      this.dipService.getDipendenti().subscribe((response: Dipendente[]) => {
        if (response && response.length > 0) {
          this.dipendenti = response;
        }
      })
    })
  }

  ModificaDipendente() {
    this.dipendente.numero_matricola = Math.trunc(this.dipendente.numero_matricola);

    if( this.dipendente.nome != '' && this.dipendente.cognome != '' && this.dipendente.codice_fiscale != '' && this.dipendente.numero_matricola >= 0 ) {
      if ( this.dipendenti.find( dipendente => { return this.dipendente.numero_matricola == dipendente.numero_matricola && this.dipendente.id_dipendente != dipendente.id_dipendente } )) {
        this.numeroMatricolaDipendenteDuplicato = true;
      }
      else {
        this.dipService.putDipendente(this.dipendente, this.dipendente.id_dipendente).subscribe( (response: Dipendente) => {
          this.dipendente = response;
          if (response) {
            this.TornaAiDipendenti();
          }
        });
      }
    }
    
  }

  TornaAiDipendenti() {
    this.router.navigate(['/Dipendenti/' + this.dipendente.id_negozio]);
  }
}
