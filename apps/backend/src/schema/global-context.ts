import { UserDocument } from '../user/mongoose-schema/user-mongoose-schema';

export interface GlobalContext {
  user?: UserDocument;
}
