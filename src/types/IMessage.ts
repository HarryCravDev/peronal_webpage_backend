export interface IMessage {
  _id: string | number;
  email: string;
  message: string;
  replied: boolean;
  __v?: number;
}
