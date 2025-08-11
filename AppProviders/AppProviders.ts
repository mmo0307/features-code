import { ReactNode } from "react";

type Props = { children: ReactNode };
type Provider = (p: Props) => JSX.Element;

export const composeProviders = (...p: Provider[]) =>
  p.reduceRight(
    (Acc, P) =>
      ({ children }: Props) =>
        <P><Acc>{children}</Acc></P>,
    ({ children }: Props) => <>{children}</>
  );

// USE CASE
export const AppProviders = composeProviders(
  AuthProvider,   // Most outer provider
  ThemeProvider,
  I18nProvider,
  QueryProvider,
  FlagsProvider   // Most inner provider
);

<AppProviders>{children}</AppProviders>
