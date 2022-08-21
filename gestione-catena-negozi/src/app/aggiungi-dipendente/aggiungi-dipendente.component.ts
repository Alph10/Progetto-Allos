import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Dipendente } from '../models/Dipendente';
import { DipendenteService } from '../services/dipendente.service';

@Component({
  selector: 'app-aggiungi-dipendente',
  templateUrl: './aggiungi-dipendente.component.html',
  styleUrls: ['./aggiungi-dipendente.component.css']
})
export class AggiungiDipendenteComponent implements OnInit {

  dipendente: Dipendente;
  dipendenti: Dipendente[];

  numeroMatricolaDipendenteDuplicato: boolean;

  formDipendente: FormGroup;

  constructor(public dipService: DipendenteService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.dipendente = new Dipendente;
    this.dipendenti = [];

    this.numeroMatricolaDipendenteDuplicato = false;

    this.formDipendente = new FormGroup({
      nomeDipendente: new FormControl('', Validators.required),
      cognomeDipendente: new FormControl('', Validators.required),
      data_di_nascitaDipendente: new FormControl(new Date(), Validators.required),
      codice_fiscaleDipendente: new FormControl('', Validators.required),
      numero_matricolaDipendente: new FormControl('', [ Validators.required, Validators.min(0) ]),
      responsabileDipendente: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.dipService.getDipendenti().subscribe((response: Dipendente[]) => {
      if (response && response.length > 0) {
        this.dipendenti = response;
      }
    });
  }

  AggiungiDipendente() {
    this.dipendente.id_negozio = Number(this.activatedRoute.snapshot.paramMap.get('id_negozio'));
    this.dipendente.nome = this.formDipendente.controls['nomeDipendente'].value;
    this.dipendente.cognome = this.formDipendente.controls['cognomeDipendente'].value;
    this.dipendente.data_di_nascita = this.formDipendente.controls['data_di_nascitaDipendente'].value;
    this.dipendente.codice_fiscale = this.formDipendente.controls['codice_fiscaleDipendente'].value;
    this.dipendente.numero_matricola = Math.trunc(this.formDipendente.controls['numero_matricolaDipendente'].value);
    this.dipendente.responsabile = this.formDipendente.controls['responsabileDipendente'].value;
    
    if ( this.dipendenti.find( dipendente => { return this.dipendente.numero_matricola == dipendente.numero_matricola} ) ) {
      this.numeroMatricolaDipendenteDuplicato = true;
    }
    else {
      
      this.numeroMatricolaDipendenteDuplicato = false;

      if ( this.formDipendente.valid ) {
        this.dipService.postDipendente(this.dipendente).subscribe( (response: Dipendente) => {
          if (response) {
            this.dipendente = response;
            this.TornaAiDipendenti();
          }
        })
      }
    }

  }

  TornaAiDipendenti() {
    let id_negozio = this.activatedRoute.snapshot.paramMap.get('id_negozio');
    this.router.navigate(['/Dipendenti/' + id_negozio]);
  }

}