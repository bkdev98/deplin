import { FC, useMemo, useState } from "react";
import {
  Aside,
  Center,
  Group,
  Loader,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ErrorResponse, Layer, ScreenVersion } from "@zeplin/sdk";

import Layout from "../../components/Layout";
import { zeplinClient } from "../../zeplinClient";
import DeplinLayer from "../../components/DeplinLayer";

const LatestScreenVersion: FC<{}> = () => {
  const { projectId = "", screenId = "" } = useParams();
  const theme = useMantineTheme();
  const [selectedLayer, setSelectedLayer] = useState<Layer | undefined>(
    undefined
  );

  const { data: screenVersion, isLoading } = useQuery<
    { data: ScreenVersion },
    ErrorResponse,
    ScreenVersion
  >(
    ["screenVersion", projectId, screenId],
    () => zeplinClient.screens.getLatestScreenVersion(projectId, screenId),
    {
      enabled: !!projectId && !!screenId,
      select: (result) => result.data,
    }
  );

  console.log(screenVersion);

  const layers = useMemo(() => {
    if (!screenVersion) return [];

    let result: Layer[] = [];

    function recusiveMerge(data: Layer) {
      if (data?.layers?.length) {
        result = [...result, ...data.layers];
        data?.layers?.forEach((item: any) => recusiveMerge(item));
      }
    }

    recusiveMerge(screenVersion as any);

    return result;
  }, [screenVersion]) as Layer[];

  console.log("layers", layers);

  return (
    <Layout
      aside={
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <Text>Selected Layer</Text>
          <Text>{JSON.stringify(selectedLayer)}</Text>
        </Aside>
      }
    >
      <Group mb={theme.spacing.lg}>
        <Text>LatestScreenVersion</Text>
        {isLoading && <Loader size="sm" />}
      </Group>
      <Center>
        {screenVersion && (
          <div
            style={{
              border: `1px solid ${theme.colors.gray[2]}`,
              width: screenVersion.width,
              height: screenVersion.height,
              backgroundColor: `rgba(${screenVersion.backgroundColor?.r}, ${screenVersion.backgroundColor?.g}, ${screenVersion.backgroundColor?.b}, ${screenVersion.backgroundColor?.a})`,
              backgroundImage: `url("${screenVersion.imageUrl}")`,
              backgroundSize: "contain",
              position: "relative",
            }}
          >
            {layers?.map((layer) => (
              <DeplinLayer
                key={layer.id}
                data={layer}
                selected={selectedLayer?.id === layer.id}
                onSelect={setSelectedLayer}
              />
            ))}
          </div>
        )}
      </Center>
    </Layout>
  );
};

export default LatestScreenVersion;
