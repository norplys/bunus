export type BaseRecord = {
  id: string;
};

type Role = "ADMIN" | "USER" | "MERCHANT" | "KITCHEN" | "CASHIER";

export type User = BaseRecord & {
  email: string;
  name: string;
  role: Role;
  image: string;
  phoneNumber: string;
};

export type UserWithToken = User & {
  token: string;
};

export type Category = BaseRecord & {
  name: string;
  orderIndex: number;
};

export type Cart = BaseRecord & {
  userId: string;
  active: boolean;
  _count: {
    cartItem: number;
  };
  cartItem: CartItem[];
  total: number;
};

export type CartItem = BaseRecord & {
  total: number;
  quantity: number;
  note?: string;
  menu: Menu;
  menuId: string;
};

export type Menu = BaseRecord & {
  discountPrice?: number | null;
  name: string;
  image: string;
  price: number;
  description: string;
  available: boolean;
  categoryId: string;
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
  cartId: string;
  queue: number | null;
  type: OrderType;
  status: OrderStatus;
  point: number;
  user: User;
  payment: Payment;
};

export type OrderDetail = Order & {
  cart: Cart;
};

export type Payment = BaseRecord & {
  snapToken: string;
  snapRedirectUrl: string;
  status: PaymentStatus;
  method: PaymentMethod;
};

export type PaymentMethod = "CASH" | "DEBIT" | "QRIS";

export type OrderType = "DINE_IN" | "TAKE_AWAY" | "DELIVERY";

export type OrderStatus =
  | "UNPAID"
  | "UNPAID_COOKING"
  | "UNPAID_DELIVERING"
  | "COOKING"
  | "DELIVERING"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "UNPAID" | "PENDING" | "SUCCESS" | "CANCELLED";
