import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Giacenza } from '../models/Giacenza';
import { GiacenzaService } from '../services/giacenza.service';
import { Articolo } from '../models/Articolo';
import { ArticoloService } from '../services/articolo.service';
import { Negozio } from '../models/Negozio';
import { NegozioService } from '../services/negozio.service';

@Component({
  selector: 'app-giacenza',
  templateUrl: './Giacenze.component.html',
  styleUrls: ['./Giacenze.component.css']
})
export class GiacenzeComponent implements OnInit {

  giacenze: Giacenza[];
  clickedGiacenza: Giacenza;

  id_negozio: number;

  articoli: Articolo[];
  articoliInGiacenza: string[];

  negozio: Negozio;

  constructor(public giacService: GiacenzaService, public artService: ArticoloService, public negService: NegozioService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.giacenze = [];
    this.clickedGiacenza = new Giacenza;
    
    this.id_negozio = Number(this.activatedRoute.snapshot.paramMap.get('id_negozio'));

    this.articoli = [];
    this.articoliInGiacenza = [];

    this.negozio = new Negozio;
  }

  ngOnInit(): void {
    this.giacService.getGiacenzeNegozio(this.id_negozio).subscribe((response: Giacenza[]) => {
      if (response && response.length > 0) {
        this.giacenze = response;
      }
    })

    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;

        // Riempie l'array articoliInGiacenza con i nomi degli articoli (ottenuti tramite gli id degli articoli) per mostrarli nella lista giacenze
        this.giacenze.forEach( giacenza => {

          let tempArt = this.articoli.find(articolo => {
            return articolo.id_articolo == giacenza.id_articolo;
          })?.articolo;

          if (tempArt) {
            this.articoliInGiacenza.push(tempArt);
          }
        });
      }
    })

    // Ottiene il nome del negozio dall'id per mostrarlo sopra la lista giacenze
    this.negService.getNegozio(Number(this.id_negozio)).subscribe( (response: Negozio) => {
      this.negozio = response;
    })
  }

  ModificaGiacenza(neg: Giacenza) {
    this.clickedGiacenza = neg;
    this.router.navigate(['modifica-giacenza/' + this.clickedGiacenza.id_giacenza]);
  }

  EliminaGiacenza(id_articolo:number, i:number) {
    this.giacService.deleteGiacenza(id_articolo).subscribe( (response) => {
      this.giacenze.splice(i, 1);
    });
  }

  TornaAlNegozio() {
    this.router.navigate(['/modifica-negozio/'+this.id_negozio]);
  }

  TornaAiNegozi() {
    this.router.navigate(['/Negozi']);
  }

  AggiungiGiacenza() {
    this.router.navigate(['/aggiungi-giacenza/'+this.id_negozio]);
  }
}
