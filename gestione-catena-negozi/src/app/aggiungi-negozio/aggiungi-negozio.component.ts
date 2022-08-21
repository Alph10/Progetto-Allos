import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-aggiungi-negozio',
  templateUrl: './aggiungi-negozio.component.html',
  styleUrls: ['./aggiungi-negozio.component.css']
})
export class AggiungiNegozioComponent implements OnInit {

  negozio: Negozio;

  formNegozio: FormGroup;

  constructor(public negService: NegozioService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.negozio = new Negozio;

    this.formNegozio = new FormGroup({
      nomeNegozio: new FormControl('', Validators.required),
      indirizzoNegozio: new FormControl('', Validators.required),
      dimensione_mqNegozio: new FormControl('', [ Validators.required, Validators.min(0.01) ]),
      dimensione_magazzino_mqNegozio: new FormControl('', [ Validators.required, Validators.min(0.01) ]),
    })
  }

  ngOnInit(): void {
  }

  AggiungiNegozio() {
    
    if ( this.formNegozio.valid ) {

      this.negozio.negozio = this.formNegozio.controls['nomeNegozio'].value;
      this.negozio.indirizzo = this.formNegozio.controls['indirizzoNegozio'].value;
      this.negozio.dimensione_mq = Math.trunc(this.formNegozio.controls['dimensione_mqNegozio'].value*100)/100;
      this.negozio.dimensione_magazzino_mq = Math.trunc(this.formNegozio.controls['dimensione_magazzino_mqNegozio'].value*100)/100;
      this.negozio.num_dipendenti = 0;
      
      this.negService.postNegozio(this.negozio).subscribe( (response: Negozio) => {
        if (response) {
          this.negozio = response;
          this.TornaAiNegozi();
        }
      })
    }
  }

  TornaAiNegozi() {
    this.router.navigate(['/Negozi']);
  }

}
