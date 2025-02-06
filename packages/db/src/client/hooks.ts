import {
  useLiveIncrementalQuery,
  useLiveQuery,
} from "@electric-sql/pglite-react";
import type { PgRelationalQuery } from "drizzle-orm/pg-core/query-builders/query";

interface LoadingState {
  status: "loading";
}

interface SuccessState<T> {
  status: "success";
  data: T[];
}

type SubscriptionResult<T> = LoadingState | SuccessState<T>;

export const useSubscription = <T>(
  query: PgRelationalQuery<T>,
  key: string,
): SubscriptionResult<T> => {
  const sql = query.toSQL();
  const res = useLiveIncrementalQuery(sql.sql, sql.params, key);
  if (!res) {
    return {
      status: "loading",
    };
  }

  return {
    status: "success",
    data: res.rows as T[],
  };
};

export { useLiveQuery };
