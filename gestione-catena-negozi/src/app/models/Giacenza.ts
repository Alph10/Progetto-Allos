// Modello per i dati delle giacenze

export class Giacenza {
    public id_giacenza: number;
    public id_negozio: number;
    public id_articolo: number;
    public quantita: number;
    public taglia: number;

    constructor() {
        this.id_giacenza = 0;
        this.id_negozio = 0;
        this.id_articolo = 0;
        this.quantita = 0;
        this.taglia = 0;
    }
}