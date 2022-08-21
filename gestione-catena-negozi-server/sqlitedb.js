var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "gestione-catena-negozi-db.sqlite";
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        db.run(
            `CREATE TABLE TB_NEGOZI (
                id_negozio INTEGER PRIMARY KEY AUTOINCREMENT,
                negozio TEXT,
                indirizzo TEXT,
                dimensione_mq REAL,
                dimensione_magazzino_mq REAL,
                num_dipendenti INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var insert = 'INSERT INTO TB_NEGOZI (negozio, indirizzo, dimensione_mq, dimensione_magazzino_mq, num_dipendenti) VALUES (?,?,?,?,?)';
                    db.run(insert, ['Abibas', 'Italia, via Marina 10', 150, 100, 0]);
                    db.run(insert, ['Pumba', 'Germania, via Montana 15', 300, 70, 0]);
                }
            }
        );
        
        db.run(
            `CREATE TABLE TB_DIPENDENTI (
                id_dipendente INTEGER PRIMARY KEY AUTOINCREMENT,
                id_negozio INTEGER NOT NULL REFERENCES TB_NEGOZI(id_negozio) ON DELETE CASCADE,
                numero_matricola INTEGER UNIQUE,
                nome TEXT,
                cognome REAL,
                data_di_nascita DATE,
                responsabile BOOLEAN,
                codice_fiscale TEXT
            )`,
            (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    db.run(
                        `CREATE TRIGGER after_insert_dipendente AFTER INSERT ON TB_DIPENDENTI
                        BEGIN 
                            UPDATE TB_NEGOZI SET num_dipendenti = num_dipendenti + 1
                            WHERE id_negozio = NEW.id_negozio;
                        END;`
                    );
                    db.run(
                        `CREATE TRIGGER after_delete_dipendente AFTER DELETE ON TB_DIPENDENTI
                        BEGIN 
                            UPDATE TB_NEGOZI SET num_dipendenti = num_dipendenti - 1
                            WHERE id_negozio = OLD.id_negozio;
                        END;`
                    );
                    
                    setTimeout( () =>  { // Per far passare un minimo di tempo altrimenti ogni tanto alcuni venivano inseriti prima che il trigger venissse creato, dando un valore iniziale errato al conteggio dipendenti
                        var insert = 'INSERT INTO TB_DIPENDENTI (id_negozio, numero_matricola, nome, cognome, data_di_nascita, responsabile, codice_fiscale) VALUES (?,?,?,?,?,?,?)';
                        db.run(insert, [1, 1111, 'Mario', 'Rossi', new Date(), true, 'MMMMMMMMM1111111']);
                        db.run(insert, [1, 2222, 'Luigi', 'Verdi', new Date(), false, 'LLLLLLLLL2222222']);
                        db.run(insert, [2, 3333, 'Wario', 'Gialli', new Date(), true, 'WWWWWWWWW3333333']);
                        db.run(insert, [2, 4444, 'Waluigi', 'Viola', new Date(), false, 'WLWLWLWLW4444444']);
                    }, 3000);
                }
            }
        );

        db.run(
            `CREATE TABLE TB_ARTICOLI (
                id_articolo INTEGER PRIMARY KEY AUTOINCREMENT,
                codice INTEGER UNIQUE,
                articolo TEXT,
                prezzo REAL,
                peso REAL,
                sezione TEXT,
                taglia BOOLEAN
             )`,
            (err) => {
                if (err) {
                    console.log(err);
                } else {
                    var insert = 'INSERT INTO TB_ARTICOLI (codice, articolo, prezzo, peso, sezione, taglia) VALUES (?,?,?,?,?,?)';
                    db.run(insert, [1000, 'Scarpe da calcio', 50, 1, 'Calcio', true]);
                    db.run(insert, [2000, 'Raccetta da tennis', 120, 2, 'Tennis', false]);
                }
            }
        );
                
        db.run(
            `CREATE TABLE TB_GIACENZE (
                id_giacenza INTEGER PRIMARY KEY AUTOINCREMENT,
                id_negozio INTEGER NOT NULL REFERENCES TB_NEGOZI(id_negozio) ON DELETE CASCADE,
                id_articolo INTEGER NOT NULL REFERENCES TB_ARTICOLI(id_articolo) ON DELETE CASCADE,
                quantita INTEGER,
                taglia REAL
            )`,
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        );
    }
});
module.exports = db;