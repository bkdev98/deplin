import { createStyles } from "@mantine/core";
import { FC } from "react";
import { DlLayer } from "../../types";

export interface RulersProps {
  layer: DlLayer;
}

const useStyles = createStyles((theme) => ({
  rulerHorizontal: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: 0,
    top: 0,
    borderTop: `1px dashed ${theme.colors.pink[4]}`,
  },
  rulerVertical: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: 0,
    top: 0,
    borderLeft: `1px dashed ${theme.colors.pink[4]}`,
  },
}))

const Rulers: FC<RulersProps> = ({ layer }) => {
  const { classes } = useStyles();

  return <>
      <div className={classes.rulerHorizontal} style={{ top: layer.rect.absolute.y }} />
      <div className={classes.rulerVertical} style={{ left: layer.rect.absolute.x }} />
      <div className={classes.rulerHorizontal} style={{ top: layer.rect.absolute.y + layer.rect.height - 1 }} />
      <div className={classes.rulerVertical} style={{ left: layer.rect.absolute.x + layer.rect.width - 1 }} />
  </>;
};

export default Rulers;
