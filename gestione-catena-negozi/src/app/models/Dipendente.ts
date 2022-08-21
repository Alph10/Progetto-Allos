// Modello per i dati dei dipendenti

export class Dipendente {
    public id_dipendente: number;
    public id_negozio: number;
    public numero_matricola: number;
    public nome: string;
    public cognome: string;
    public data_di_nascita: Date;
    public responsabile: boolean;
    public codice_fiscale: string;

    constructor() {
        this.id_dipendente = 0;
        this.id_negozio = 0;
        this.numero_matricola = 0;
        this.nome = '';
        this.cognome = '';
        this.data_di_nascita = new Date;
        this.responsabile = false;
        this.codice_fiscale = '';
    }
}