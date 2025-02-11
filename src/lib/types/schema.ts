export type BaseRecord = {
  id: string;
};

export type User = BaseRecord & {
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  image: string;
};

export type UserWithToken = User & {
  token: string;
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

export type Order = BaseRecord & {
  total: number;
  userId: string;
  isDone: boolean;
  isCooked: boolean;
  table: number;
  type: "DINE_IN" | "TAKE_AWAY";
  merchant: string;
  user: {
    name: string;
    email: string;
  };
  payment: Payment;
};

export type OrderDetail = Order & {
  items: CartItem &
    {
      menu: Menu;
    }[];
};

export type Payment = BaseRecord & {
  status: string;
  method: "cash" | "debit" | "qris";
};
