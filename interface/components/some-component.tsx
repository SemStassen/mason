import { api } from "@mason/trpc/client";

export function SomeComponent() {
  const { data } = api.hello.useQuery({ name: "World" });
  return <div>{data}</div>;
}
