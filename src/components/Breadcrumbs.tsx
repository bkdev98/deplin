import { ErrorResponse, Project, Screen } from "@zeplin/sdk";
import { FC } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';
import useZeplinClient from "../utils/useZeplinClient";

interface BreadcrumbsProps {}

const Breadcrumbs: FC<BreadcrumbsProps> = () => {
    const { projectId = "", screenId = "" } = useParams();
    const zeplinClient = useZeplinClient();

    const { data: project, isLoading: isLoadingProject } = useQuery<
        { data: Project },
        ErrorResponse,
        Project
    >(["project", projectId], () => zeplinClient.projects.getProject(projectId), {
        enabled: !!projectId,
        select: (result) => result.data,
    });

    const { data: screen, isLoading: isLoadingScreen } = useQuery<
        { data: Screen },
        ErrorResponse,
        Screen
    >(
        ["screen", projectId, screenId],
        () => zeplinClient.screens.getScreen(projectId, screenId),
        {
            enabled: !!projectId && !!screenId,
            select: (result) => result.data,
        }
    );

    return (
        <MantineBreadcrumbs>
            <Anchor component={Link} to={'/'}>
                Deplin
            </Anchor>
            {!!projectId && (
                <Anchor component={Link} to={`/project/${projectId}`}>
                    {project?.name || ''}
                </Anchor>
            )}
            {!!projectId && !!screenId && (
                <Anchor component={Link} to={`/project/${projectId}/screen/${screenId}`}>
                    {screen?.name}
                </Anchor>
            )}
        </MantineBreadcrumbs>
    )
}

export default Breadcrumbs;
