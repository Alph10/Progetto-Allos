import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Giacenza } from '../models/Giacenza';
import { Articolo } from '../models/Articolo';
import { GiacenzaService } from '../services/giacenza.service';
import { ArticoloService } from '../services/articolo.service';
import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-aggiungi-giacenza',
  templateUrl: './aggiungi-giacenza.component.html',
  styleUrls: ['./aggiungi-giacenza.component.css']
})
export class AggiungiGiacenzaComponent implements OnInit {

  giacenza: Giacenza;
  giacenze: Giacenza[];

  negozio: Negozio;

  articoli: Articolo[];
  articolo: Articolo;
  nomeArticolo: string;

  giacenzaDuplicata: boolean;

  id_negozio: number;

  formGiacenza: FormGroup;

  constructor(public giacService: GiacenzaService, public artService: ArticoloService, public negService: NegozioService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.giacenza = new Giacenza;
    this.giacenze = []

    this.negozio = new Negozio;

    this.articoli = [];
    this.articolo = new Articolo;
    this.nomeArticolo = '';

    this.giacenzaDuplicata = false;

    this.id_negozio = Number(this.activatedRoute.snapshot.paramMap.get('id_negozio'));

    this.formGiacenza = new FormGroup({
      articoloGiacenza: new FormControl('', Validators.required),
      quantitaGiacenza: new FormControl(0, [ Validators.required, Validators.min(1) ]),
      tagliaGiacenza: new FormControl(0, [ Validators.required, Validators.min(1) ])
    })
  }

  ngOnInit(): void {
    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;
      }
    })

    this.negService.getNegozio(Number(this.id_negozio)).subscribe( (response: Negozio) => {
      this.negozio = response;
    })

    this.giacService.getGiacenzeNegozio(this.id_negozio).subscribe((response: Giacenza[]) => {
      if (response && response.length > 0) {
        this.giacenze = response;
      }
    })
  }

  AggiungiGiacenza() {
    this.articolo = this.formGiacenza.controls['articoloGiacenza'].value;

    this.giacenza.id_negozio = this.id_negozio;
    this.giacenza.id_articolo = this.articolo.id_articolo;
    this.giacenza.quantita = Math.trunc(this.formGiacenza.controls['quantitaGiacenza'].value);
    
    if (this.articolo.taglia) {
      this.giacenza.taglia = Math.trunc(this.formGiacenza.controls['tagliaGiacenza'].value*10)/10;
    }
    else {
      this.giacenza.taglia = 0;
    }

  
    if ( this.giacenze.find( giacenza => { return this.giacenza.id_articolo == giacenza.id_articolo && this.giacenza.taglia == giacenza.taglia } ) ) {
      this.giacenzaDuplicata = true;
    }
    else {
      this.giacenzaDuplicata = false;

      if ( this.giacenza.id_articolo != null && this.giacenza.quantita > 0 && (this.giacenza.taglia > 0 || this.articolo.taglia == false) ) {
        this.giacService.postGiacenza(this.giacenza).subscribe( (response: Giacenza) => {
          if (response) {
            this.giacenza = response;
            this.TornaAlleGiacenze();
          }
        })
      }
    }

  }

  TornaAlleGiacenze() {
    this.router.navigate(['/Giacenze/'+this.id_negozio]);
  }

}
