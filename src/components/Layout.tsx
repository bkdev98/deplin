import { AppShell, AppShellProps, Avatar, Header } from "@mantine/core";
import Breadcrumbs from "./Breadcrumbs";
import UserActions from "./UserActions";

export default function Layout(props: AppShellProps) {
  return (
    <AppShell
      fixed
      header={
        <Header height={50} p="md" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Breadcrumbs />
          <UserActions />
        </Header>
      }
      {...props}
    />
  );
}
