import { FC, useMemo, useState } from "react";
import {
  Aside,
  Center,
  createStyles,
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
import { DlLayer } from "../../types";
import Rulers from "./Rulers";
import Distances from "./Distances";
import LayerDetail from "./LayerDetail";

const useStyles = createStyles((theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.gray[1],
  },
}))

const LatestScreenVersion: FC<{}> = () => {
  const { projectId = "", screenId = "" } = useParams();
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [selectedLayer, setSelectedLayer] = useState<DlLayer | undefined>(
    undefined
  );
  const [hoverredLayer, setHoverredLayer] = useState<DlLayer | undefined>(
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

  const layers = useMemo(() => {
    if (!screenVersion) return [];

    let result: DlLayer[] = [];

    function recusiveMerge(data: Layer) {
      if (data?.layers?.length) {
        result = [
          ...result,
          ...data.layers.map((item) => ({
            ...item,
            parent: data.type && data,
          })),
        ];
        data?.layers?.forEach((item: any) => recusiveMerge(item));
      }
    }

    recusiveMerge(screenVersion as any);

    return result;
  }, [screenVersion]) as DlLayer[];

  return (
    <Layout
      aside={
        <Aside hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <LayerDetail data={selectedLayer} />
        </Aside>
      }
    >
      <Group mb={theme.spacing.lg}>
        <Text>LatestScreenVersion</Text>
        {isLoading && <Loader size="sm" />}
      </Group>
      <Center style={{ position: 'relative' }} p={theme.spacing.lg}>
        <div
          className={classes.overlay}
          onClick={() => setSelectedLayer(undefined)}
        />
        {screenVersion && (
          <div
            style={{
              border: `1px solid ${theme.colors.gray[2]}`,
              width: screenVersion.width + 2,
              height: screenVersion.height + 2,
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
                onHover={(data) => !!selectedLayer && setHoverredLayer(data)}
              />
            ))}
            {selectedLayer && (
              <Rulers layer={selectedLayer} />
            )}
            {selectedLayer && hoverredLayer && (
              <Distances mainLayer={selectedLayer} targetLayer={hoverredLayer} />
            )}
          </div>
        )}
      </Center>
    </Layout>
  );
};

export default LatestScreenVersion;
