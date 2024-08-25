const express = require('express');
const app = express()
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PORT = 8080;
var mysql = require('mysql2');
let cors = require('cors')
let bodyParser = require('body-parser')
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
//Making connection with database
let con = mysql.createConnection({
    host:"0.0.0.0",
    user:"root",
    password:"2580",
    database:"students"
});
con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
});
// app.get("/getcountstatus/:id/:duration", (req, res) => {
//     const search = req.params.id;
//     const duration = req.params.duration;
//     if(duration==="Monthly"){
//         const query = "SELECT COUNT(*)  FROM student  WHERE status = ? AND        DATE_FORMAT(STR_TO_DATE(date, '%d/%m/%Y'), '%Y-%m-%d') < DATE_FORMAT(NOW(), '%Y-%m-%d');"; // Using parameterized query
//         con.query(query, [search], (err, result) => {
//             if (err) {
//                 return res.status(500).send({ error: err });
//             }
//             return res.status(200).send({ result: result });
//         });
//     }
//     console.log(duration);
//     const query = "SELECT COUNT(*) AS count FROM student WHERE status = ?"; // Using parameterized query
//     con.query(query, [search], (err, result) => {
//         if (err) {
//             return res.status(500).send({ error: err });
//         }
//         return res.status(200).send({ result: result });
//     });
// });


app.get("/getcountstatus/:id/:duration", (req, res) => {
    const search = req.params.id;
    const duration = req.params.duration;
    if(duration === "Monthly") {
        const query = "SELECT COUNT(*) as count FROM uniquestd WHERE status = ? AND YEAR(STR_TO_DATE(date, '%d/%m/%Y')) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH) AND MONTH(STR_TO_DATE(date, '%d/%m/%Y')) = MONTH(CURRENT_DATE()) AND DATE(STR_TO_DATE(date, '%d/%m/%Y'))<= DATE(CURRENT_DATE());";
        con.query(query, [search], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).send({ result: result });
        });
    }else if(duration==="Daily"){
        const query = "SELECT COUNT(*) AS count FROM uniquestd WHERE status = ? AND DATE_FORMAT(STR_TO_DATE(date, '%d/%m/%Y'), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d');";
        con.query(query, [search], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).send({ result: result });
        });
    } else {
        const query = "SELECT COUNT(*) AS count FROM uniquestd WHERE status = ?"; 
        con.query(query, [search], (err, result) => {
            if (err) {
                return res.status(500).send({ error: err });
            }
            return res.status(200).send({ result: result });
        });
    }
});



app.get('/getcertaincat/:status',(req,res)=>{
    const status = req.params.status;
    const query = "select name,phone,address,course,university,status from uniquestd where status = ?;"
    con.query(query,[status],(err,result)=>{
        if(err){
            return res.status(500).send({error:err});
        }
        return res.status(200).send({result:result});
    })
})

app.get('/getuniquestd',(req,res)=>{
    query = "select * from uniquestd";
    con.query(query,(err,result)=>{
        if(err){
            return res.status(500).send({error:err});
        }
        return res.status(200).send({result:result});
    })
})
app.get('/getuniquestd/:id',(req,res)=>{
    const pid = req.params.id;
    query = "select * from uniquestd where ( cip LIKE ? ) or (name LIKE ?);";
    con.query(query,["%"+pid+"%","%"+pid+"%"],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send({error:err});
        }
        return res.status(200).send({result:result});
    })
})
app.get('/user/:id',(req,res)=>{
    const pid = req.params.id;
    query = "select * from uniquestd where cip=?;";
    con.query(query,[pid],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send({error:err});
        }
        return res.status(200).send({result:result});
    })
})
app.get('/useralldata/:id',(req,res)=>{
    const pid = req.params.id;
    query = "select * from student where cip=?;";
    con.query(query,[pid],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send({error:err});
        }
        return res.status(200).send({result:result});
    })
})


app.get('/getallstd', (req, res) => {
    const sqlQuery = "select * from student;";

    con.query(sqlQuery, (err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send({ error: "Error retrieving student data" });
        }

        res.status(200).send({ students: result });
    });
});


//Handle notes 

app.get('/getnotes/:id',(req,res)=>{
    const pid = req.params.id;
    let sqlQuery = 'select note from notes where cip = ?';
    con.query(sqlQuery,[pid], (err, result) => {
        if (err) {
            console.error("Error geting notes:", err);
            return res.status(500).send({ error: "Error retrieving notes" });
        }

        res.status(200).send({ notes: result });
    });
})

app.get('/setnotes/:id', (req, res) => {
    const pid = req.params.id;
    const note = {
        notes:decodeURIComponent(req.query.note),
    };
    let sqlQuery = 'UPDATE notes set note = ? where cip = ?';
    con.query(sqlQuery,[note.notes,pid], (err, result) => {
        if (err) {
            console.error("Error setting notes:", err);
            return res.status(500).send({ error: "Error setting notes" });
        }

        res.status(200).send({ notes: result });
    });
});
////////////////////////////////
app.get('/setnewlead',(req,res)=>{
    const NewLead = {
        name:decodeURIComponent(req.query.name),
        phone:decodeURIComponent(req.query.phone),
        address:decodeURIComponent(req.query.address),
        course:decodeURIComponent(req.query.course),
        university:decodeURIComponent(req.query.university),
        date:decodeURIComponent(req.query.date),
        status:decodeURIComponent(req.query.status),
        cip:decodeURIComponent(req.query.cip),
        dob:decodeURIComponent(req.query.dob),
        email:decodeURIComponent(req.query.email),
    };
    let sqlQuery = `INSERT INTO uniquestd VALUES (?,?,?,?,?,?,?,?,?,?);`
    con.query(sqlQuery,[NewLead.name,NewLead.phone,NewLead.address,NewLead.course,NewLead.university,NewLead.date,NewLead.status,NewLead.cip,NewLead.dob,NewLead.email], (err, result) => {
        if (err) {
            console.error("Error Adding NewLead:", err);
            return res.status(500).send({ error: "Error Adding NewLead" });
        }
        let DocsqlQuery = `INSERT INTO documents (cip) VALUES (${NewLead.cip});`;
        con.query(DocsqlQuery,(err,result)=>{
            if (err) {
                console.error("Error Adding NewLead:", err);
                return res.status(500).send({ error: "Error Adding NewLead" });
            }
        })
        let NotesqlQuery = `INSERT INTO notes (cip) VALUES (${NewLead.cip});`;
        con.query(NotesqlQuery,(err,result)=>{
            if (err) {
                console.error("Error Adding NewLead:", err);
                return res.status(500).send({ error: "Error Adding NewLead" });
            }
        })
        res.status(200).send({ result:"ok" });
    });
})
///////////////////////////////
app.get('/setnewdata',(req,res)=>{
    const NewLead = {
        course:decodeURIComponent(req.query.course),
        university:decodeURIComponent(req.query.university),
        date:decodeURIComponent(req.query.date),
        status:decodeURIComponent(req.query.status),
        cip:decodeURIComponent(req.query.cip),
    };
    let sqlQuery = `INSERT INTO student VALUES (?,?,?,?,?);`
    con.query(sqlQuery,[NewLead.course,NewLead.university,NewLead.date,NewLead.status,NewLead.cip], (err, result) => {
        if (err) {
            console.error("Error Adding NewLead:", err);
            return res.status(500).send({ error: "Error Adding NewLead" });
        }
        let updateQuery = `UPDATE uniquestd SET date = ?,status = ? WHERE cip = ?;`
        con.query(updateQuery,[NewLead.date,NewLead.status,NewLead.cip],(err,result)=>{
            if (err) {
                console.error("Error Adding NewLead:", err);
                return res.status(500).send({ error: "Error Adding NewLead" });
            }
        })
        res.status(200).send({ result:"ok" });
    });
    
})
///////////////////////////////
const upload = multer({ dest: 'uploads/' });

app.post('/upload/:docname/:id', upload.single('pdf'), (req, res) => {
    const docname = req.params.docname;
    const pid = req.params.id;
    const { file } = req;
    
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Read the file and store it in the database
    const filePath = path.join(__dirname, file.path);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        // Check if the column exists, and if not, create it
        const checkColumnQuery = "SHOW COLUMNS FROM documents LIKE ?;";
        con.query(checkColumnQuery, [docname], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length === 0) {
                // Column does not exist, so create it
                const alterTableQuery = `ALTER TABLE documents ADD COLUMN ?? LONGBLOB;`;
                con.query(alterTableQuery, [docname], (err, result) => {
                    if (err) {
                        return res.status(500).send('Cannot create column.');
                    }
                    insertDocument();
                });
            } else {
                // Column exists, proceed to insert the document
                insertDocument();
            }
        });

        function insertDocument() {
            // Insert the file into the database
            const insertQuery = `UPDATE documents SET ?? = ? WHERE cip = ?;`;
            con.query(insertQuery, [docname, data, pid], (err, result) => {
                if (err) {
                    return res.status(500).send('Error storing file in database.');
                }
                res.status(200).send('File uploaded and stored in database.');
            });
        }
    });
});
// API endpoint to list all PDFs
app.get('/getpdf/:docname/:id', (req, res) => {
    const docname = req.params.docname;
    const pid = req.params.id;

    // Fetch the PDF from the database
    const fetchQuery = `SELECT ?? FROM documents WHERE cip = ?;`;
    con.query(fetchQuery, [docname, pid], (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching PDF from database.');
        }
        if (result.length === 0 || !result[0][docname]) {
            return res.status(404).send('PDF not found.');
        }

        // Send the PDF file as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.send(result[0][docname]);
    });
});

app.get('/getpdfname/:id', (req, res) => {
    const pid = req.params.id;
    // Fetch the PDF from the database
    const fetchQuery = `show columns from documents;`;
    con.query(fetchQuery, (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching columns from database.');
        }
        let cols = [];
        let queries = result.map((el) => {
            return new Promise((resolve, reject) => {
                const Query = `select ${el.Field} from documents where cip = ${pid};`;
                con.query(Query, (err, result1) => {
                    if (err) {
                        return reject('Error fetching columns from database.');
                    }
                    if (result1[0][el.Field] != null) {
                        // console.log(result1[0][el.Field]);
                        cols.push(el.Field);
                    }
                    resolve();
                });
            });
        });
        Promise.all(queries)
            .then(() => {
                // console.log(cols);
                res.send({result:cols});
            })
            .catch((error) => {
                res.status(500).send(error);
            });

        
    });
    // const Query = `select ? from documents where cip = 9918;`;
    // con.query(Query,[colname], (err, result1) => {
    //     if (err) {
    //         return res.status(500).send('Error fetching columns from database.');
    //     }
    //     res.send(result1)
    // });
});


// API endpoint to get a specific PDF
app.get('/pdfs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT filename, file_data FROM pdf_storage WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error retrieving PDF.');
        }
        if (result.length === 0) {
            return res.status(404).send('PDF not found.');
        }

        const { filename, file_data } = result[0];
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(file_data);
    });
});

app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
});
