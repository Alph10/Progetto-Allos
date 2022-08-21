import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-modifica-negozio',
  templateUrl: './modifica-negozio.component.html',
  styleUrls: ['./modifica-negozio.component.css']
})
export class ModificaNegozioComponent implements OnInit {

  negozio: Negozio;

  constructor(public negService: NegozioService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.negozio = new Negozio;
  }

  ngOnInit(): void {
    let id_negozio = this.activatedRoute.snapshot.paramMap.get('id_negozio');

    this.negService.getNegozio(Number(id_negozio)).subscribe( (response: Negozio) => {
      this.negozio = response;
    })
  }

  ModificaNegozio() {
    this.negozio.dimensione_mq = Math.trunc(this.negozio.dimensione_mq*100)/100;
    this.negozio.dimensione_magazzino_mq = Math.trunc(this.negozio.dimensione_magazzino_mq*100)/100;

    if( this.negozio.negozio != '' && this.negozio.indirizzo != '' && this.negozio.dimensione_mq >= 0.01 && this.negozio.dimensione_magazzino_mq >= 0.01 ) {
      this.negService.putNegozio(this.negozio, this.negozio.id_negozio).subscribe( (response: Negozio) => {
        this.negozio = response;
        if (response) {
          this.TornaAiNegozi();
        }
      });
    }
    
    
  }

  TornaAiNegozi() {
    this.router.navigate(['/Negozi']);
  }

  Dipendenti() {
    this.router.navigate(['/Dipendenti/'+this.negozio.id_negozio]);
  }

  Giacenze() {
    this.router.navigate(['/Giacenze/'+this.negozio.id_negozio]);
  }

}
