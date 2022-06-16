import { ZeplinApi, Configuration } from "@zeplin/sdk";

import useAuth from "./useAuth";

const useZeplinClient = () => {
    const { zeplinAccessToken } = useAuth()

    const zeplinClient = new ZeplinApi(
        new Configuration({
          accessToken: zeplinAccessToken,
        })
    );

    return zeplinClient;
}

export default useZeplinClient;
