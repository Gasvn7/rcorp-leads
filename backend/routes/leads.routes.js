const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { Parser } = require('json2csv');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get('/', (req,res) => {
  const { role, industry, country, CNAE } = req.query;
  
  let query = 'SELECT * FROM leads WHERE 1=1';
  if (role) query += ` AND role = '${role}'`;
  if (industry) query += ` AND industry = '${industry}'`;
  if (country) query += ` AND country = '${country}'`;
  if (CNAE) query += ` AND CNAE = '${CNAE}'`;

  db.query(query, (err, results)=>{
    if (err) throw err;
    res.json(results);
  });
});

router.post('/download', (req,res) => {
  const { emails } = req.body;
  
  if(!emails || emails.length === 0){
    return res.status(400).send('No leads provided for download');
  }

  let query = 'SELECT * FROM leads WHERE email IN (?)'

  db.query(query, [emails], (err, results)=>{
    if (err) throw err;
    
    db.query('UPDATE leads SET downloadCount = downloadCount + 1 WHERE email IN (?)', [emails], (err, updateResult)=>{
      if (err) throw err;
      console.log("updateResult")
      console.log(updateResult)
      console.log("updateResult")

      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(results);
  
      res.header('Content-Type', 'text/csv');
      res.attachment('leads.csv');
      res.send(csv);
    })
  });
});

router.get('/roles', (req,res)=>{
  db.query('SELECT DISTINCT role FROM leads l', (err, results)=>{
    if(err) throw err;
    res.json(results.map(row => row.role));
  })
})

router.get('/industries', (req,res)=>{
  db.query('SELECT DISTINCT industry FROM leads l', (err, results)=>{
    if(err) throw err;
    res.json(results.map(row => row.industry));
  })
})

router.get('/countries', (req,res)=>{
  db.query('SELECT DISTINCT country FROM leads l', (err, results)=>{
    if(err) throw err;
    res.json(results.map(row => row.country));
  })
})

router.get('/cnae', (req,res)=>{
  db.query('SELECT DISTINCT CNAE FROM leads l', (err, results)=>{
    if(err) throw err;
    res.json(results.map(row => row.CNAE));
  })
})

module.exports = router;