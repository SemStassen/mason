import { Providers } from "./providers";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return <Providers locale={params.locale}>{children}</Providers>;
}
