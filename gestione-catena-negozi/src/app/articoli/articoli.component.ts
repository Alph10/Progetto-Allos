import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Articolo } from '../models/Articolo';
import { ArticoloService } from '../services/articolo.service';
import { Giacenza } from '../models/Giacenza';
import { GiacenzaService } from '../services/giacenza.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  articoli: Articolo[];
  clickedArticolo: Articolo;

  giacenze: Giacenza[];

  constructor(public artService: ArticoloService, public giacService: GiacenzaService, private router: Router) {
    this.articoli = [];
    this.clickedArticolo = new Articolo;

    this.giacenze = [];
  }

  ngOnInit(): void {
    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;
      }
    });

    this.giacService.getGiacenze().subscribe((response: Giacenza[]) => {
      if (response && response.length > 0) {
        this.giacenze = response;
      }
    });
  }

  modificaArticolo(art: Articolo) {
    this.clickedArticolo = art;
    this.router.navigate(['modifica-articolo/' + this.clickedArticolo.id_articolo]);
  }

  eliminaArticolo(id_articolo:number, i:number) {
    this.artService.deleteArticolo(id_articolo).subscribe( (response) => {
      this.articoli.splice(i, 1);

      // ON DELETE CASCADE non funziona nell'applicazione (anche se inviando un comando DELETE al database va), quindi lo aggiungo col codice
      let onDeleteCascadeGiacenze: Giacenza[];
      onDeleteCascadeGiacenze = this.giacenze.filter( giacenza => { return giacenza.id_articolo == id_articolo } );

      onDeleteCascadeGiacenze.forEach(giacenza => {
        this.giacService.deleteGiacenza(giacenza.id_giacenza).subscribe( (response) => {
          this.giacenze.splice(i, 1);
        });
      });

    });
  }

  aggiungiArticolo() {
    this.router.navigate(['/aggiungi-articolo']);
  }
}
