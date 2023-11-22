import mongoose from "mongoose";

// Define a schema for the transaction data
const transactionSchema = new mongoose.Schema({
  txn_status: String,
  txn_msg: String,
  txn_err_msg: String,
  clnt_txn_ref: String,
  tpsl_bank_cd: String,
  tpsl_txn_id: String,
  txn_amt: String,
  clnt_rqst_meta: String,
  tpsl_txn_time: String,
  bal_amt: String,
  card_id: String,
  alias_name: String,
  BankTransactionID: String,
  
});

// Create a Mongoose model for transactions using the schema
const Transaction = mongoose.model('Transactions', transactionSchema);

export default Transaction;
