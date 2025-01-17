export type BaseRecord = {
  id: string;
};

export type Category = BaseRecord & {
  name: string;
  orderIndex: number;
};

export type Menu = BaseRecord & {
  name: string;
  image: string;
  price: number;
  description: string;
};
