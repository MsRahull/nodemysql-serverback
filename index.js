import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: "103.145.50.46",
    user: "ntplstaging_shopify",
    password: "Naethra@24",
    database: "ntplstaging_cwptraining"
});

// Routes
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM nodebook";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO nodebook (nname, nemail, nmobile, ngender) VALUES (?)";
    const values = [
        req.body.nname,
        req.body.nemail,
        req.body.nmobile,
        req.body.ngender
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO noderegister (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM noderegister WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json({ Error: "Error in query" });
        }
        if (data.length > 0) {
            return res.json({ success: true, message: "Logged in successfully", id: data[0].id });
        } else {
            return res.json({ Error: "Invalid email or password" });
        }
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE nodebook SET nname = ?, nemail = ?, nmobile = ?, ngender = ? WHERE id = ?";
    const values = [
        req.body.nname,
        req.body.nemail,
        req.body.nmobile,
        req.body.ngender
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM nodebook WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ error: "Error in query" });
        }
        if (data.affectedRows > 0) {
            return res.json({ success: true, message: "Delete successful" });
        } else {
            return res.json({ error: "Delete failed" });
        }
    });
});

app.get('/getrecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM nodebook WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
});

// Create HTTP server
const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
