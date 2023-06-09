import mongoose from 'mongoose';
import validator from 'validator';

import bcrypt from 'bcrypt';

export interface IUser extends Document {
  user: globalThis.Date;
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  passwordChangedAt: number;
  role: string;
  active: boolean;
  tryLoginCount: number;
  tryLoginTime?: any;
  $isNew: boolean;
  passwordCompare: (arg0: string, arg1: string) => Promise<boolean>;
  changedPasswordAfter: (arg0: number) => boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, '用戶必須含有名稱'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, '用戶必須含有email'],
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
    passwordChangedAt: Date,
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin'],
        message: '出現錯誤權限用戶',
      },
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    tryLoginCount: {
      type: Number,
      default: 0,
    },
    tryLoginTime: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    strict: true, //(重要)除了設計中的資料欄位，其他不會儲存到MongoDB中
  }
);

// pre process repeat fields
userSchema.pre('validate', async function (next) {
  const user = this;

  const userCheckerData = {
    name: user.name,
    email: user.email,
  };
  ///////////////
  for (const [name, value] of Object.entries(userCheckerData)) {
    const existingUserField = await User.findOne({ [name]: value });
    if (existingUserField) {
      await user.invalidate(name, `${name}已被使用`);
    }
  }

  next();
});

//hash password
userSchema.pre('save', async function (next) {
  const user = this; // Bypass ts check this keyword

  //如果密碼未被更動，直接跳到下一個middleware
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 12);
  user.confirmPassword = undefined; // 設定undefined 不會紀錄於mongoDB
  next();
});

//修正DateBase 與JsonWebToken 時間差, 避免導致用戶永被判定已更改密碼
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password') || user.$isNew) return next();
  user.passwordChangedAt = Date.now() - 1000;

  next();
});

//比對dataBase 上的加密密碼
userSchema.methods.passwordCompare = async function (
  currentPassword: string,
  dateBasePassword: string
) {
  return await bcrypt.compare(currentPassword, dateBasePassword);
};

//確認密碼是否已經更改
userSchema.methods.changedPasswordAfter = function (jwtIat: number) {
  if (this.passwordChangedAt) {
    //這裡修正 DataBase 上的時間單位除1000，配合JS使用
    //@ts-ignore
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);

    return changedTimeStamp > jwtIat;
  }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
