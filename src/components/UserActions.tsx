import { Avatar, Group, Menu, Text } from "@mantine/core";
import { ErrorResponse, User } from "@zeplin/sdk";
import { FC } from "react";
import { useQuery } from "react-query";
import useAuth from "../utils/useAuth";
import useZeplinClient from "../utils/useZeplinClient";

interface UserActionsProps {}

const UserActions: FC<UserActionsProps> = () => {
    const zeplinClient = useZeplinClient();
    const { zeplinAccessToken, setZeplinAccessToken } = useAuth();
    const { data: user } = useQuery<
        { data: User },
        ErrorResponse,
        User
    >(["me"], () => zeplinClient.users.getCurrentUser(), {
        enabled: !!zeplinAccessToken,
        select: (result) => result.data,
    });

    if (!zeplinAccessToken) return null;
    
    return (
        <Menu control={
            <Group style={{ cursor: 'pointer' }}>
                <Avatar src={user?.avatar} alt={user?.username} radius="xl" />
                <Text ml={-10} size='sm' color='gray'>{user?.username}</Text>
            </Group>
        }>
            <Menu.Item onClick={() => setZeplinAccessToken('')}>Logout</Menu.Item>
        </Menu>
    )
}

export default UserActions;
