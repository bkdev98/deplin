import { createStyles, useMantineTheme } from "@mantine/core";
import { Layer } from "@zeplin/sdk";
import { FC } from "react";

export interface DeplinLayerProps {
  data: Layer;
  selected?: boolean;
  onSelect?: (layer: Layer) => void;
}

const useStyles = createStyles((theme) => ({
  deplinLayer: {
    position: "absolute",
    zIndex: 5,

    "&:hover": {
      border: `1px solid ${theme.colors.pink[4]}`,
    },
  },
  selected: {
    border: `1px solid ${theme.colors.pink[4]}`,
  },
}));

const DeplinLayer: FC<DeplinLayerProps> = ({ data, selected, onSelect }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  return (
    <div
      className={cx(classes.deplinLayer, { [classes.selected]: selected })}
      onClick={() => onSelect?.(data)}
      style={{
        width: data.rect.width,
        height: data.rect.height,
        top: data.rect.absolute.y,
        left: data.rect.absolute.x,
      }}
    />
  );
};

export default DeplinLayer;
