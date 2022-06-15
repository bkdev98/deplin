import { createStyles, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { DlLayer } from "../types";

export interface DeplinLayerProps {
  data: DlLayer;
  selected?: boolean;
  onSelect?: (layer: DlLayer) => void;
  onHover?: (layer: DlLayer | undefined) => void;
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
  parent: {
    position: "absolute",
    backgroundColor: theme.colors.blue[4],
    opacity: 0.2,
  },
}));

const DeplinLayer: FC<DeplinLayerProps> = ({
  data,
  selected,
  onSelect,
  onHover,
}) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  return (
    <div>
      <div
        onClick={() => onSelect?.(data)}
        onMouseEnter={() => onHover?.(data)}
        onMouseLeave={() => onHover?.(undefined)}
        className={cx(classes.deplinLayer, { [classes.selected]: selected })}
        style={{
          width: data.rect.width,
          height: data.rect.height,
          top: data.rect.absolute.y,
          left: data.rect.absolute.x,
        }}
      />
      {selected && data.parent && (
        <div
          className={classes.parent}
          style={{
            width: data.parent.rect.width,
            height: data.parent.rect.height,
            top: data.parent.rect.absolute.y,
            left: data.parent.rect.absolute.x,
          }}
        />
      )}
    </div>
  );
};

export default DeplinLayer;
