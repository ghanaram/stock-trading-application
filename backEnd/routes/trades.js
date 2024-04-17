var express = require('express');
var app = express.Router();
const db = require('../db')

app.get('/trades', (req, res) => {
  try {
    sql = ' SELECT * FROM trade_details'
    db.query(sql,(error, result) => {
      console.log(result);
      res.send(result)
    })
  } catch (err) {
    console.error('Error fetching trades:', err);
    res.json({
      error: 'Error fetching trades'
    })
  }
})

app.get('/trades/:id', (req, res) => {
  try {
    sql = ' SELECT * FROM trade_details where id=?'
    db.query(sql,[req.params.id],(error, result) => {
      console.log(result);
      res.send(result)
    })
  } catch (err) {
    console.error('Error fetching trades:', err);
    res.json({
      error: 'Error fetching trades'
    })
  }
})


app.post('/trades', (req, res) => {
  console.log(req.body)
  const { tradeDateTime, stockName, listingPrice, quantity, type, pricePerUnit } = req.body;
  try {
      // Validate request body
      if (!tradeDateTime || !stockName || !listingPrice || !quantity || !type || !pricePerUnit) {
          throw new Error('Missing required fields');
      }
       db.query(
          'INSERT INTO trade_details (tradeDateTime, stockName, listingPrice, quantity, type, pricePerUnit) VALUES (?, ?, ?, ?, ?, ?)',
          [tradeDateTime, stockName, listingPrice, quantity, type, pricePerUnit],(err,result)=>{

            console.log(result);
            if (result.affectedRows > 0) {
              res.json({
                success: true,
                message: 'Trade created successfully'
              });
            }

          }
      );
  } catch (err) {
      console.error('Error creating trade:', err);
      res.json({ error: err.message });
  }
});


app.put('/trades/:id', (req, res) => {
  try {
       db.query(
          'UPDATE trade_details SET tradeDateTime=?, stockName=?, listingPrice=?, quantity=?, type=?, pricePerUnit=? WHERE id=?',
          [  new Date(req.body.tradeDateTime) ,req.body.stockName, req.body.listingPrice, req.body.quantity, req.body.type,  req.body.pricePerUnit, req.params.id],(err, results)=>{
            if (err) {
              console.log(err, "errs");
              res.send({
                success: false,
                data: "Something Went Wrong !",
              });
            } else if (results.affectedRows) {
              res.send({
                success: true,
                UpdatedRows: results.affectedRows
              });
            } else {
              res.send({
                success: false,
                data: "Something Went Wrong !",
              });
            }

          }
      );

  } catch (err) {
      console.error('Error updating trade:', err);
      res.json({ error: 'Error updating trade' });
  }
});


app.delete('/trades/:id', (req, res) => {
 
  try {
      db.query('DELETE FROM trade_details WHERE id=?',[req.params.id],(err,result)=>{
        if(err){
          res.send({
            success:false
          })
        }else{
         
          res.send({ 
            success:true,
            data: result });
        }
      });
  } catch (err) {
      console.error('Error deleting trade:', err);
      res.status.json({ error: 'Error deleting trade' });
  }
});


module.exports = app;
