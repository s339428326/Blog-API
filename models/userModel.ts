import mongoose from 'mongoose';
import validator from 'validator';

// import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, '用戶必須含有名稱'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, '用戶必須含有名稱'],
      validate: [validator.isEmail, '請輸入有效信箱'],
    },
    password: {
      type: String,
      trim: true,
      validate: [
        function (val: string) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val);
        },
        '密碼最少8個字元, 並包含一個小寫英文字母',
      ],
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: [
        function (this: IUser, val: string) {
          return val === this.password;
        },
        '請確認密碼輸入是否相同',
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    strict: true, //(重要)除了設計中的資料欄位，其他不會儲存到MongoDB中
  }
);

const User = mongoose.model<IUser>('User', userSchema);

module.exports = User;
