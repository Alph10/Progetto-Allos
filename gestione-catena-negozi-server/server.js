var express = require("express");
var cors = require('cors');
var db = require("./sqlitedb.js");
var app = express();
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});


// API TB_NEGOZI

app.get("/api/negozi", (req, res, next) => {
    var sql = "SELECT * FROM TB_NEGOZI";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.get("/api/negozi/:id_negozio", (req, res, next) => {
    var sql = "SELECT * FROM TB_NEGOZI WHERE id_negozio = ?";
    var params = [req.params.id_negozio];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

app.post("/api/negozi/", (req, res, next) => {
    var errors = [];
    if (!req.body.item) {
        errors.push("No item specified");
    }
    var data = {
        negozio: req.body.negozio,
        indirizzo: req.body.indirizzo,
        dimensione_mq: req.body.dimensione_mq,
        dimensione_magazzino_mq: req.body.dimensione_magazzino_mq,
        num_dipendenti: req.body.num_dipendenti
    };
    var sql = 'INSERT INTO TB_NEGOZI (negozio, indirizzo, dimensione_mq, dimensione_magazzino_mq, num_dipendenti) VALUES (?,?,?,?,?)';
    var params = [data.negozio, data.indirizzo, data.dimensione_mq, data.dimensione_magazzino_mq, data.num_dipendenti];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(data);
    });
});

app.put("/api/negozi/:id_negozio", (req, res, next) => {
    var data = {
        negozio: req.body.negozio,
        indirizzo: req.body.indirizzo,
        dimensione_mq: req.body.dimensione_mq,
        dimensione_magazzino_mq: req.body.dimensione_magazzino_mq,
        num_dipendenti: req.body.num_dipendenti
    };
    db.run(`UPDATE TB_NEGOZI SET negozio = ?, indirizzo = ?, dimensione_mq = ?, dimensione_magazzino_mq = ?, num_dipendenti = ? WHERE id_negozio = ?`,
        [data.negozio, data.indirizzo, data.dimensione_mq, data.dimensione_magazzino_mq, data.num_dipendenti, req.params.id_negozio],
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json(data);
    });
});

app.delete("/api/negozi/:id_negozio", (req, res, next) => {
    db.run('DELETE FROM TB_NEGOZI WHERE id_negozio = ?', req.params.id_negozio, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});


//API TB_DIPENDENTI

app.get("/api/dipendenti", (req, res, next) => {
    var sql = "SELECT * FROM TB_DIPENDENTI";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.get("/api/dipendenti/:id_dipendente", (req, res, next) => {
    var sql = "SELECT * FROM TB_DIPENDENTI WHERE id_dipendente = ?";
    var params = [req.params.id_dipendente];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

app.get("/api/dipendenti-negozio/:id_negozio", (req, res, next) => {
    var sql = "SELECT * FROM TB_DIPENDENTI WHERE id_negozio = ?";
    var params = [req.params.id_negozio];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.post("/api/dipendenti/", (req, res, next) => {
    var errors = [];
    if (!req.body.item) {
        errors.push("No item specified");
    }
    var data = {
        id_negozio: req.body.id_negozio,
        numero_matricola: req.body.numero_matricola,
        nome: req.body.nome,
        cognome: req.body.cognome,
        data_di_nascita: req.body.data_di_nascita,
        responsabile: req.body.responsabile,
        codice_fiscale: req.body.codice_fiscale
    };
    var sql = 'INSERT INTO TB_DIPENDENTI (id_negozio, numero_matricola, nome, cognome, data_di_nascita, responsabile, codice_fiscale) VALUES (?,?,?,?,?,?,?)';
    var params = [data.id_negozio, data.numero_matricola, data.nome, data.cognome, data.data_di_nascita, data.responsabile, data.codice_fiscale];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(data);
    });
});

app.put("/api/dipendenti/:id_dipendente", (req, res, next) => {
    var data = {
        id_negozio: req.body.id_negozio,
        numero_matricola: req.body.numero_matricola,
        nome: req.body.nome,
        cognome: req.body.cognome,
        data_di_nascita: req.body.data_di_nascita,
        responsabile: req.body.responsabile,
        codice_fiscale: req.body.codice_fiscale
    };
    db.run(`UPDATE TB_DIPENDENTI SET id_negozio = ?, numero_matricola = ?, nome = ?, cognome = ?, data_di_nascita = ?, responsabile = ?, codice_fiscale = ? WHERE id_dipendente = ?`,
        [data.id_negozio, data.numero_matricola, data.nome, data.cognome, data.data_di_nascita, data.responsabile, data.codice_fiscale, req.params.id_dipendente],
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json(data);
    });
});

app.delete("/api/dipendenti/:id_dipendente", (req, res, next) => {
    db.run('DELETE FROM TB_DIPENDENTI WHERE id_dipendente = ?', req.params.id_dipendente, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});


// API TB_ARTICOLI

app.get("/api/articoli", (req, res, next) => {
    var sql = "SELECT * FROM TB_ARTICOLI";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.get("/api/articoli/:id_articolo", (req, res, next) => {
    var sql = "SELECT * FROM TB_ARTICOLI WHERE id_articolo = ?";
    var params = [req.params.id_articolo];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

app.post("/api/articoli/", (req, res, next) => {
    var errors = [];
    if (!req.body.item) {
        errors.push("No item specified");
    }
    var data = {
        codice: req.body.codice,
        articolo: req.body.articolo,
        prezzo: req.body.prezzo,
        peso: req.body.peso,
        sezione: req.body.sezione,
        taglia: req.body.taglia
    };
    var sql = 'INSERT INTO TB_ARTICOLI (codice, articolo, prezzo, peso, sezione, taglia) VALUES (?,?,?,?,?,?)';
    var params = [data.codice, data.articolo, data.prezzo, data.peso, data.sezione, data.taglia];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(data);
    });
});

app.put("/api/articoli/:id_articolo", (req, res, next) => {
    var data = {
        codice: req.body.codice,
        articolo: req.body.articolo,
        prezzo: req.body.prezzo,
        peso: req.body.peso,
        sezione: req.body.sezione,
        taglia: req.body.taglia
    };
    db.run(`UPDATE TB_ARTICOLI SET codice = ?, articolo = ?, prezzo = ?, peso = ?, sezione = ?, taglia = ? WHERE id_articolo = ?`,
        [data.codice, data.articolo, data.prezzo, data.peso, data.sezione, data.taglia, req.params.id_articolo],
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json(data);
    });
});

app.delete("/api/articoli/:id_articolo", (req, res, next) => {
    db.run('DELETE FROM TB_ARTICOLI WHERE id_articolo = ?', req.params.id_articolo, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});


//API TB_GIACENZE

app.get("/api/giacenze", (req, res, next) => {
    var sql = "SELECT * FROM TB_GIACENZE";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.get("/api/giacenze/:id_giacenza", (req, res, next) => {
    var sql = "SELECT * FROM TB_GIACENZE WHERE id_giacenza = ?";
    var params = [req.params.id_giacenza];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

app.get("/api/giacenze-negozio/:id_negozio", (req, res, next) => {
    var sql = "SELECT * FROM TB_GIACENZE WHERE id_negozio = ?";
    var params = [req.params.id_negozio];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows)
    });
});

app.post("/api/giacenze/", (req, res, next) => {
    var errors = [];
    if (!req.body.item) {
        errors.push("No item specified");
    }
    var data = {
        id_negozio: req.body.id_negozio,
        id_articolo: req.body.id_articolo,
        quantita: req.body.quantita,
        taglia: req.body.taglia
    };
    var sql = 'INSERT INTO TB_GIACENZE (id_negozio, id_articolo, quantita, taglia) VALUES (?,?,?,?)';
    var params = [data.id_negozio, data.id_articolo, data.quantita, data.taglia];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(data);
    });
});

app.put("/api/giacenze/:id_giacenza", (req, res, next) => {
    var data = {
        id_negozio: req.body.id_negozio,
        id_articolo: req.body.id_articolo,
        quantita: req.body.quantita,
        taglia: req.body.taglia,
    };
    db.run(`UPDATE TB_GIACENZE SET id_negozio = ?, id_articolo = ?, quantita = ?, taglia = ? WHERE id_giacenza = ?`,
        [data.id_negozio, data.id_articolo, data.quantita, data.taglia, req.params.id_giacenza],
        function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json(data);
    });
});

app.delete("/api/giacenze/:id_giacenza", (req, res, next) => {
    db.run('DELETE FROM TB_GIACENZE WHERE id_giacenza = ?', req.params.id_giacenza, function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});


app.use(function (req, res) {
    res.status(404);
});