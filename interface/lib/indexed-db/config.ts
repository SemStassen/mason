export const DB_CONFIG = {
  name: "mason",
  version: 1,
  stores: {
    user: {
      name: "user",
      keyPath: "uuid",
      indexes: [
        {
          name: "uuid",
          keyPath: "uuid",
        },
      ],
    },
  },
} as const;
