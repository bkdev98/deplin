import { AppShell, AppShellProps, Header, Text } from "@mantine/core";

export default function Layout(props: AppShellProps) {
  return (
    <AppShell
      header={
        <Header height={50} p="md">
          <Text>Deplin</Text>
        </Header>
      }
      {...props}
    />
  );
}
