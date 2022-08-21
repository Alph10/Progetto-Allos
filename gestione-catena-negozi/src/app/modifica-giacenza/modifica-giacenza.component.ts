import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Giacenza } from '../models/Giacenza';
import { Articolo } from '../models/Articolo';
import { GiacenzaService } from '../services/giacenza.service';
import { ArticoloService } from '../services/articolo.service';

@Component({
  selector: 'app-modifica-giacenza',
  templateUrl: './modifica-giacenza.component.html',
  styleUrls: ['./modifica-giacenza.component.css']
})
export class ModificaGiacenzaComponent implements OnInit {

  giacenza: Giacenza;

  articolo: Articolo;

  constructor(public giacService: GiacenzaService, public artService: ArticoloService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.giacenza = new Giacenza;

    this.articolo = new Articolo;
  }

  ngOnInit(): void {
    let id_giacenza = this.activatedRoute.snapshot.paramMap.get('id_giacenza');

    this.giacService.getGiacenza(Number(id_giacenza)).subscribe( (response: Giacenza) => {
      this.giacenza = response;
      
      this.artService.getArticolo(Number(this.giacenza.id_articolo)).subscribe( (response: Articolo) => {
        this.articolo = response;
      })
    })

  }

  ModificaGiacenza() {
    if (this.giacenza.quantita >= 1) {
      this.giacenza.quantita = Math.trunc(this.giacenza.quantita);
      this.giacService.putGiacenza(this.giacenza, this.giacenza.id_giacenza).subscribe( (response: Giacenza) => {
        this.giacenza = response;
        if (response) {
          this.TornaAlleGiacenze();
        }
      });
    }
  }

  TornaAlleGiacenze() {
    this.router.navigate(['/Giacenze/'+this.giacenza.id_negozio]);
  }

}
