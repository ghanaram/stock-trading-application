var express = require('express');
var app = express.Router();
const bodyParser = require('body-parser');
const db = require('../db')
app.use(bodyParser.json());
app.use(express.json());

// GET all orders with pagination
app.get('/',  (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Execute the database query asynchronously using await
  
    db.query('SELECT * FROM order_master LIMIT ?, ?', [offset, parseInt(limit)],((err,result)=>{

  res.send(result)
    }));

  }) ;

  app.get('/:id', async (req, res) => {
    try {
     
      let sql = `
      SELECT om.id,om.perUnitPrice,om.quantity,om.stockName,td.tradeDateTime,om.status FROM order_master om JOIN trade_details td ON om.tradeId = td.id WHERE om.id =?
      `;
  
      const result = await new Promise((resolve, reject) => {
        db.query(sql, [req.params.id], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      if (result.length > 0) {
        res.send({
          success: true,
          data: result,
        });
      } else {
        res.send({
          success: false,
          data: result,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });


  app.put('/confirm/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const sql = 'UPDATE order_master SET status = ? WHERE id = ?';
      const values = ['confirmed', orderId];
  
      // Execute the update query
      db.query(sql, values, (error, result) => {
        if (error) {
          console.error('Error confirming order:', error);
          return res.status(500).json({ success: false, error: 'Error confirming order' });
        }
  
        if (result.affectedRows > 0) {
          res.json({ success: true, message: 'Order confirmed successfully' });
        } else {
          res.status(404).json({ success: false, error: 'Order not found' });
        }
      });
    } catch (error) {
      console.error('Error confirming order:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

app.post('/orderCreate', (req, res) => {

    // console.log(req.body)
 // Validate request body
 if (!req.body.tradeId || !req.body.quantity || !req.body.perUnitPrice || !req.body.type || !req.body.stockName) {
  throw new Error('Missing required fields');
}

// Check if the trade ID exists in the trade_details table
db.query('SELECT id FROM trade_details WHERE id = ?', [req.body.tradeId], (error, rows) => {
  if (error) {
    throw error;
  }

  if (rows && rows.length > 0) {
    // Trade ID exists, proceed with order creation
    sql = 'INSERT INTO order_master (tradeId, quantity, perUnitPrice, type, stockName) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [req.body.tradeId, req.body.quantity, req.body.perUnitPrice, req.body.type, req.body.stockName], (err, result) => {
      if (err) {
        console.error('Error creating order:', err);
        res.json({
          success: false,
          error: 'Error creating order'
        });
      } else {
        // console.log(result);
        if (result.affectedRows > 0) {
          res.json({
            success: true,
            message: 'Order created successfully'
          });
        }
      }
    });
  } 
else {
    // Trade ID does not exist
    res.json({
      success: false,
      error: 'Invalid trade ID'
    });
  }
})
});




module.exports = app;
