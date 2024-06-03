import { UserDocument } from '../model/user/mongoose-schema/user-mongoose-schema';

export interface GlobalContext {
  user?: UserDocument;
}
