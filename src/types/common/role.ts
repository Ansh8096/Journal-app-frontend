export const Roles = [
    "USER",
    "ADMIN"
] as const;

export type Role = (typeof Roles)[number];
