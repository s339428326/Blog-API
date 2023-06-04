import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = require('./app');

dotenv.config({ path: './config.env' });

mongoose.connect(
  `${
    process.env.NODE_ENV === 'development'
      ? process.env.LOCAL_DATABASE
      : process.env.SERVER_DATABASE
  }`
);

const db = mongoose.connection;

db.on('error', () => console.log('MongoDB 連結失敗！'));
db.once('open', () => console.log('mongoDB 連結成功！'));

app.listen(process.env.PORT || 5501, () => {
  console.log(`Start! Port:${process.env?.PORT}`);
});
