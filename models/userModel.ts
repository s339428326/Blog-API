import mongoose from 'mongoose';
import validator from 'validator';

// import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userSchema = new mongoose.Schema<IUser>({
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
    minLength: 6,
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
        return val === this.confirmPassword;
      },
      '請確認密碼輸入是否相同',
    ],
  },
});

userSchema.pre('save', function () {
  console.log('加密在這裡');
});

const User = mongoose.model<IUser>('User', userSchema);

module.exports = User;
