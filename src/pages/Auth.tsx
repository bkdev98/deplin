import { Button, Container, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ErrorResponse, User } from "@zeplin/sdk";
import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import useAuth from "../utils/useAuth";
import useZeplinClient from "../utils/useZeplinClient";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
    const { zeplinAccessToken, setZeplinAccessToken } = useAuth();
    const zeplinClient = useZeplinClient();
    const { data: user, isLoading } = useQuery<
        { data: User },
        ErrorResponse,
        User
    >(["me"], () => zeplinClient.users.getCurrentUser(), {
        enabled: !!zeplinAccessToken,
        select: (result) => result.data,
    });
    const form = useForm({
        initialValues: {
          token: '',
        },
    });
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from?.pathname || "/";

    useEffect(() => {
        if (!!zeplinAccessToken && !!user?.id) {
            navigate(from, { replace: true });
        }
    }, [zeplinAccessToken, user])

    return (
        <Layout>
            <Container>
                <form onSubmit={form.onSubmit(values => setZeplinAccessToken(values.token))}>
                    <Title my='lg' order={3}>Authentication</Title>
                    <Textarea
                        placeholder="Enter Zeplin access token..."
                        mb='md'
                        {...form.getInputProps('token')}
                    />
                    <Button type='submit' loading={isLoading}>Start</Button>
                </form>
            </Container>
        </Layout>
    )
}

export default Auth;
