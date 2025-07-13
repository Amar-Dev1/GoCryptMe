export interface IFormData {
  name: string;
  password: string;
  platform: {
    name: string;
    img: string;
  } | any;
}
