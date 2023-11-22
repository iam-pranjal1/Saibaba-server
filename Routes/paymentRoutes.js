import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import mongoose from 'mongoose';

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

// Import the Transaction model
import Transaction from '../Model/paymentModel.js';

// Replace 'YOUR_MERCHANT_KEY' with your actual merchant key
// const merchantKey = 'YOUR_MERCHANT_KEY';

router.post('/MerchantResponsePage', (req, res) => {
  
  const response = req.body.returnUrl; // Get the response value sent by the payment gateway
  const receivedHash = req.body.hash; // Get the received hash value from the response
  const fields = response.split('|'); // Split the response into fields

  const txn_status = fields[0];
  const txn_msg = fields[1];
  const txn_err_msg = fields[2];
  const clnt_txn_ref = fields[3];
  const tpsl_bank_cd = fields[4];
  const tpsl_txn_id = fields[5];
  const txn_amt = fields[6];
  const clnt_rqst_meta = fields[7];
  const tpsl_txn_time = fields[8];
  const bal_amt = fields[9];
  const card_id = fields[10];
  const alias_name = fields[11];
  const BankTransactionID = fields[12];
  const mandate_reg_no = fields[13];
  const token = fields[14];

  // Create a string to calculate the hash
  const hashString = `${txn_status}|${txn_msg}|${txn_err_msg}|${clnt_txn_ref}|${tpsl_bank_cd}|${tpsl_txn_id}|${txn_amt}|${clnt_rqst_meta}|${tpsl_txn_time}|${bal_amt}|${card_id}|${alias_name}|${BankTransactionID}|${mandate_reg_no}|${token}`;

  // Calculate the hash using the same algorithm used during checkout initialization
  const calculatedHash = crypto.createHash('sha256').update(hashString).digest('hex');

  if (calculatedHash === receivedHash) {
    // Hash matched, process the transaction based on txn_status
    if (txn_status === '0300') {
      // Success
      // Update the status of the transaction in the merchant's database as successful
      // Show a success acknowledgement to the end customer
      res.send('Transaction Successful');
    } else if (txn_status === '0398') {
      // Initiated
      // Update the status of the transaction in the merchant's database as initiated
      // Show an initiated acknowledgement to the end customer
      res.send('Transaction Initiated');
    } else {
      // Other statuses (e.g., failure, awaited, aborted)
      // Update the status of the transaction in the merchant's database accordingly
      // Show an appropriate acknowledgement to the end customer
      res.send('Transaction Status: ' + txn_status);
    }

    // Create a new Transaction document and save it to the database
    const newTransaction = new Transaction({
      txn_status,
      txn_msg,
      txn_err_msg,
      clnt_txn_ref,
      tpsl_bank_cd,
      tpsl_txn_id,
      txn_amt,
      clnt_rqst_meta,
      tpsl_txn_time,
      bal_amt,
      card_id,
      alias_name,
      BankTransactionID,
      // Add other fields as needed
    });

    newTransaction.save((err) => {
      if (err) {
        console.error('Error saving transaction:', err);
      } else {
        console.log('Transaction saved successfully');
      }
    });

  } else {
    // Hash does not match, show a failure acknowledgement with a technical error
    res.send('Transaction Failed: Hash Mismatch');
  }
});

export default router;
