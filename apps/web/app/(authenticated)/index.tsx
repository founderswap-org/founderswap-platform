import AuthenticatedLayoutClient from '../../components/authenticated-layout-client/client';

export default async function AuthenticatedLayout({
  children,
}: { children: React.ReactNode }) {
  return <AuthenticatedLayoutClient>{children}</AuthenticatedLayoutClient>;
}
