export type BaseRecord = {
  id: string;
};

export type Category = BaseRecord & {
  name: string;
  orderIndex: number;
};

export type Cart = BaseRecord & {
  items: CartItem[];
  total: number;
};

export type CartItem = BaseRecord & {
  total: number;
  quantity: number;
  menu: Menu;
};

export type Menu = BaseRecord & {
  name: string;
  image: string;
  price: number;
  description: string;
};

export type DetailMenu = Menu & {
  category: Category;
};

export type Analytics = {
  qris: number;
  cash: number;
  debit: number;
  total: number;
};
