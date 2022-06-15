import { FC } from "react";
import {
  Badge,
  Card,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Project, ErrorResponse } from "@zeplin/sdk";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { zeplinClient } from "../zeplinClient";

const Projects: FC<{}> = () => {
  const { data: projects, isLoading } = useQuery<
    { data: Project[] },
    ErrorResponse,
    Project[]
  >(["projects"], () => zeplinClient.projects.getProjects(), {
    select: (result) => result.data,
  });

  const theme = useMantineTheme();

  return (
    <Layout>
      <Group mb={theme.spacing.lg}>
        <Text>Projects</Text>
        {isLoading && <Loader size="sm" />}
      </Group>
      <SimpleGrid cols={5}>
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
