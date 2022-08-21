import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Articolo } from '../models/Articolo';
import { ArticoloService } from '../services/articolo.service';

@Component({
  selector: 'app-aggiungi-articolo',
  templateUrl: './aggiungi-articolo.component.html',
  styleUrls: ['./aggiungi-articolo.component.css']
})
export class AggiungiArticoloComponent implements OnInit {

  articolo: Articolo;
  articoli: Articolo[];

  codiceArticoloDuplicato: boolean;

  formArticolo: FormGroup;

  constructor(public artService: ArticoloService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.articolo = new Articolo;
    this.articoli = [];

    this.codiceArticoloDuplicato = false;

    this.formArticolo = new FormGroup({
      nomeArticolo: new FormControl('', Validators.required),
      codiceArticolo: new FormControl('', [ Validators.required, Validators.min(0) ]),
      prezzoArticolo: new FormControl('', [ Validators.required, Validators.min(0.01) ]),
      pesoArticolo: new FormControl('', [ Validators.required, Validators.min(0.01) ]),
      sezioneArticolo: new FormControl('', Validators.required),
      tagliaArticolo: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;
      }
    })
  }

  AggiungiArticolo() {

    if ( this.formArticolo.valid ) {

      this.articolo.articolo = this.formArticolo.controls['nomeArticolo'].value;
      this.articolo.codice = this.formArticolo.controls['codiceArticolo'].value;
      this.articolo.prezzo = this.formArticolo.controls['prezzoArticolo'].value;
      this.articolo.peso = this.formArticolo.controls['pesoArticolo'].value;
      this.articolo.sezione = this.formArticolo.controls['sezioneArticolo'].value;
      this.articolo.taglia = this.formArticolo.controls['tagliaArticolo'].value;

      if ( this.articoli.find( articolo => { return this.articolo.codice == articolo.codice } )) {
        this.codiceArticoloDuplicato = true;
      }
      else {
        this.artService.postArticolo(this.articolo).subscribe( (response: Articolo) => {
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
