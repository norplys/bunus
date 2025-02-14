export const USER_ROLES = [
  "USER",
  "ADMIN",
  "KITCHEN",
  "CASHIER",
  "MERCHANT",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const SERVICE_URL_ROLES = [
  "CASHIER",
  "MERCHANT",
  "KITCHEN",
] as const satisfies ServiceUserRole[];

export type ServiceUserRole = Extract<
  UserRole,
  "CASHIER" | "MERCHANT" | "KITCHEN"
>;

export function isServiceUserRole(
  role: UserRole | undefined,
): role is ServiceUserRole {
  return SERVICE_URL_ROLES.includes(role as ServiceUserRole);
}
