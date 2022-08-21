import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-negozio',
  templateUrl: './negozi.component.html',
  styleUrls: ['./negozi.component.css']
})
export class NegoziComponent implements OnInit {

  negozi: Negozio[];
  clickedNegozio: Negozio;

  constructor(public negService: NegozioService, private router: Router) {
    this.negozi = [];
    this.clickedNegozio = new Negozio;
  }

  ngOnInit(): void {
    this.negService.getNegozi().subscribe((response: Negozio[]) => {
      if (response && response.length > 0) {
        this.negozi = response;
      }
    })
  }

  modificaNegozio(neg: Negozio) {
    this.clickedNegozio = neg;
    this.router.navigate(['modifica-negozio/' + this.clickedNegozio.id_negozio]);
  }

  eliminaNegozio(id_articolo:number, i:number) {
    this.negService.deleteNegozio(id_articolo).subscribe( (response) => {
      this.negozi.splice(i, 1);
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
