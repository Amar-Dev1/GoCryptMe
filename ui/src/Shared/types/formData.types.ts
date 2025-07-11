export interface IPlatform {
  id: number;
  title: string;
  img: string;
}

export interface IFormData {
  title: string;
  password: string;
  platform: IPlatform;
}
