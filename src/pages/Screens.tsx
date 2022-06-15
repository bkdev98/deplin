import {
  Card,
  Center,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ErrorResponse, Screen } from "@zeplin/sdk";
import { FC } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { zeplinClient } from "../zeplinClient";

const Screens: FC<{}> = () => {
  const { projectId = "" } = useParams();
  const theme = useMantineTheme();

  const { data: screens, isLoading } = useQuery<
    { data: Screen[] },
    ErrorResponse,
    Screen[]
  >(
    ["screens", projectId],
    () => zeplinClient.screens.getProjectScreens(projectId),
    {
      enabled: !!projectId,
      select: (result) => result.data,
    }
  );

  return (
    <Layout>
      <Group mb={theme.spacing.lg}>
        <Text>Screens</Text>
        {isLoading && <Loader size="sm" />}
      </Group>
      <SimpleGrid cols={5}>
        {screens?.map((screen) => (
          <Card
            key={screen.id}
            shadow="sm"
            p="xs"
            component={Link}
            to={`${screen.id}`}
          >
            <Center style={{ flexDirection: "column" }}>
              <Card.Section mb={theme.spacing.sm}>
                <Image
                  src={screen.image.thumbnails.small}
                  height={520}
                  width={240}
                  alt={screen.name}
                />
              </Card.Section>
              <Text
                size="sm"
                style={{ color: theme.colors.gray[7], lineHeight: 1.5 }}
              >
                {screen.name}
              </Text>
            </Center>
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Screens;
