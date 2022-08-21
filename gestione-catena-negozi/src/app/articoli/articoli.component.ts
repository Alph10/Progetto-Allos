import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Articolo } from '../models/Articolo';
import { ArticoloService } from '../services/articolo.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  articoli: Articolo[];
  clickedArticolo: Articolo;

  constructor(public artService: ArticoloService, private router: Router) {
    this.articoli = [];
    this.clickedArticolo = new Articolo;
  }

  ngOnInit(): void {
    this.artService.getArticoli().subscribe((response: Articolo[]) => {
      if (response && response.length > 0) {
        this.articoli = response;
      }
    })
  }

  modificaArticolo(art: Articolo) {
    this.clickedArticolo = art;
    this.router.navigate(['modifica-articolo/' + this.clickedArticolo.id_articolo]);
  }

  eliminaArticolo(id_articolo:number, i:number) {
    this.artService.deleteArticolo(id_articolo).subscribe( (response) => {
      this.articoli.splice(i, 1);
    });
  }

  aggiungiArticolo() {
    this.router.navigate(['/aggiungi-articolo']);
  }
}
