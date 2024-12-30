import { eq } from "drizzle-orm";
import type { Client } from "../db";
import { userPreferencesTable, usersTable } from "../schema";

export async function getUserQuery(
  db: Client,
  params: {
    uuid: string;
  },
) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.uuid, params.uuid),
  });
}

export async function getUserPreferencesQuery(
  db: Client,
  params: {
    userUuid: string;
  },
) {
  return await db.query.userPreferencesTable.findFirst({
    where: eq(userPreferencesTable.userUuid, params.userUuid),
  });
}
