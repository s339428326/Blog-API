import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

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

const server = app.listen(process.env.PORT || 5501, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Start! Port:${process.env?.PORT}`);
});

//發生全域的連線錯誤
process.on('unhandledRejection', (err: Error) => {
  console.log('[contention error]', err.name, err.message);
  console.log('發生不可以預期錯誤unhandledRejection被觸發，已嘗試關閉應用程序');
  server.close(() => {
    process.exit(1);
  });
});
