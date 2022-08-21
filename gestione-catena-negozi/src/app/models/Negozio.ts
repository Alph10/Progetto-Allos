// Modello per i dati dei negozi

export class Negozio {
    public id_negozio: number;
    public negozio: string;
    public indirizzo: string;
    public dimensione_mq: number;
    public dimensione_magazzino_mq: number;
    public num_dipendenti: number;

    constructor() {
        this.id_negozio = 0;
        this.negozio = '';
        this.indirizzo = '';
        this.dimensione_mq = 0;
        this.dimensione_magazzino_mq = 0;
        this.num_dipendenti = 0;
    }
}