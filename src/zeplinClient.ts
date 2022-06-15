import { ZeplinApi, Configuration } from "@zeplin/sdk";

export const zeplinClient = new ZeplinApi(
  new Configuration({
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicGVyc29uYWxfYWNjZXNzX3Rva2VuIiwiY2xpZW50X2lkIjoiNjJhYTJlOTJlMjdiN2EzMTAxMDI0Mjk5Iiwic2NvcGUiOiJhZG1pbiIsImlhdCI6MTY1NTMyMDIxMCwiZXhwIjoxOTcwODg5NDcwLCJpc3MiOiJ6ZXBsaW46YXBpLnplcGxpbi5pbyIsInN1YiI6IjYyYTlhMDFmZDBjMmU0MmQzNWRmOGU2ZiIsImp0aSI6IjFiMmEzN2JiLWIyZTUtNGUwMi1hNDY2LWRiMDRjMTM0Njc0NSJ9.uqriX-fnhkMbQNRs4Gl-ZKO9w7l5HQduMhHdc11yUhs",
  })
);
