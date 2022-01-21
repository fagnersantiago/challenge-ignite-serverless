export interface ICreateTODO {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}
