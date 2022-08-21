// Modello per i dati degli articoli

export class Articolo {
    public id_articolo: number;
    public codice: number;
    public articolo: string;
    public prezzo: number;
    public peso: number;
    public sezione: string;
    public taglia: boolean;

    constructor() {
        this.id_articolo = 0;
        this.codice = 0;
        this.articolo = '';
        this.prezzo = 0;
        this.peso = 0;
        this.sezione = '';
        this.taglia = false;
    }
}