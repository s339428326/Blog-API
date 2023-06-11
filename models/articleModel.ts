import mongoose, {
  PopulatedDoc,
  Schema,
  Document,
  ObjectId,
  Query,
} from 'mongoose';
import { IUser } from './userModel';

export interface IArticle extends Document {
  title: string;
  content: string;
  creator: PopulatedDoc<Document<ObjectId> & IUser>; //Model Pop
  createAt?: Schema.Types.Date;
}

const articleSchema = new mongoose.Schema<IArticle>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    strict: true,
  }
);

articleSchema.pre<Query<IArticle, IArticle>>(/^find/, function (next) {
  const article = this;
  article.populate({
    path: 'creator',
    select: 'name email role',
  });

  next();
});

const Article = mongoose.model<IArticle>('Article', articleSchema);

export default Article;
