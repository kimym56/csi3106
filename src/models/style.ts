export interface Style {
  id: number;
  imagePath: string;
  type: string;
  size: string;
  owner: string;
  time: string;
}

export interface Shop {
  id: number;
  frontImagePath: string;
  backImagePath: string;
  detailImagePath: string;
  title: string;
  price: number;
  detail: string;
  type: string;
  color: string;
  time: string;
}
