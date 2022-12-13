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
  owner: {
    owner_id: number;
    owner_name: string;
  };
  frontImagePath: string;
  backImagePath: string;
  detailImagePath: string;
  title: string;
  price: number;
  detail: string;
  type: string;
  color: string;
  time: string;
  deleted: boolean;
  soldout: boolean;
}

export interface Comment {
  userId: number;
  author: string;
  comment: string;
}
