// 单个用户类型
export interface SingleUserType {
  id: number;
  name: string;
  email: string;
  create_time: string;
  status: number;
}

export interface FormValues {
  [name: string]: any
}