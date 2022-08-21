import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Articolo } from '../models/Articolo';
import { ArticoloService } from '../services/articolo.service';

@Component({
  selector: 'app-modifica-articolo',
  templateUrl: './modifica-articolo.component.html',
  styleUrls: ['./modifica-articolo.component.css']
})
export class ModificaArticoloComponent implements OnInit {

  articolo: Articolo;
  articoli: Articolo[];

  codiceArticoloDuplicato: boolean;

  constructor(public artService: ArticoloService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.articolo = new Articolo;
    this.articoli = [];

    this.codiceArticoloDuplicato = false;
  }

  ngOnInit(): void {
    let id_articolo = this.activatedRoute.snapshot.paramMap.get('id_articolo');

    this.artService.getArticolo(Number(id_articolo)).subscribe( (response: Articolo) => {
      this.articolo = response;
    })

    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;
      }
    })
  }

  ModificaArticolo() {
    this.articolo.codice = Math.trunc(this.articolo.codice);
    this.articolo.prezzo = Math.trunc(this.articolo.prezzo*100)/100;
    this.articolo.peso = Math.trunc(this.articolo.peso*100)/100;

    if( this.articolo.articolo != '' && this.articolo.codice >= 0 && this.articolo.peso >= 0.01 && this.articolo.prezzo >= 0.01 && this.articolo.sezione != '' ) {
      if ( this.articoli.find( articolo => { return this.articolo.codice == articolo.codice && this.articolo.id_articolo != articolo.id_articolo } )) {
        this.codiceArticoloDuplicato = true;
      }
      else {
        this.artService.putArticolo(this.articolo, this.articolo.id_articolo).subscribe( (response: Articolo) => {
          if (response) {
            this.articolo = response;
            this.TornaAgliArticoli();
          }
        });
      }
    }
  }

  TornaAgliArticoli() {
    this.router.navigate(['/Articoli']);
  }

}
