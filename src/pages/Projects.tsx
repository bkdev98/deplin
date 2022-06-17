import { FC } from "react";
import {
  Badge,
  Card,
  Group,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Project, ErrorResponse } from "@zeplin/sdk";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import useZeplinClient from "../utils/useZeplinClient";

const Projects: FC<{}> = () => {
  const zeplinClient = useZeplinClient();
  const { data: projects, isLoading } = useQuery<
    { data: Project[] },
    ErrorResponse,
    Project[]
  >(["projects"], () => zeplinClient.projects.getProjects({limit: 100}), {
    select: (result) => result.data,
  });

  const theme = useMantineTheme();

  return (
    <Layout>
      <SimpleGrid cols={5}>
        {isLoading && !(projects as any)?.length && [1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Skeleton
            key={item}
            visible={isLoading && !(projects as any)?.length}
            height={230}
          />
        ))}
        {projects?.map((project) => (
          <Card
            key={project.id}
            shadow="sm"
            p="lg"
            component={Link}
            to={`${project.id}`}
          >
            <Card.Section>
              <Image src={project.thumbnail} height={160} alt={project.name} />
            </Card.Section>
            <Group position="apart" my={theme.spacing.sm}>
              <Text weight={500}>{project.name}</Text>
              <Badge color="pink" variant="light">
                {project.platform}
              </Badge>
            </Group>

            <Text
              size="sm"
              style={{ color: theme.colors.gray[7], lineHeight: 1.5 }}
            >
              {project.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Projects;
