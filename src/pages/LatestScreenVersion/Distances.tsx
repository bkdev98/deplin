import { createStyles, Text } from "@mantine/core";
import { FC } from "react";
import { DlLayer } from "../../types";

export interface DistancesProps {
  mainLayer: DlLayer;
  targetLayer: DlLayer;
}

const useStyles = createStyles((theme, _, getRef) => ({
  distanceVertical: {
    position: 'absolute',
    zIndex: 20,
    width: 1,
    transform: 'translateX(-1px)',
    borderLeft: `1px solid ${theme.colors.pink[4]}`,
    [`& .${getRef('value')}`]: {
      top: '50%',
      transform: 'translateY(-50%)',
      left: 6,
    },
  },
  distanceHorizontal: {
    position: 'absolute',
    zIndex: 20,
    height: 1,
    transform: 'translateY(-1px)',
    borderTop: `1px solid ${theme.colors.pink[4]}`,
    [`& .${getRef('value')}`]: {
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 6,
    },
  },
  value: {
    ref: getRef('value'),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    zIndex: 50,
    backgroundColor: theme.colors.gray[1],
    borderRadius: 2,
    color: theme.colors.pink[4],
  },
}))

const Distances: FC<DistancesProps> = ({ mainLayer, targetLayer }) => {
  const { classes } = useStyles()

  /**
   * Main ruler
   */
  const mt = mainLayer.rect.absolute.y
  const mr = mainLayer.rect.absolute.x + mainLayer.rect.width
  const mb = mainLayer.rect.absolute.y + mainLayer.rect.height
  const ml = mainLayer.rect.absolute.x

  /**
   * Target points
   */
  const tt = [
    targetLayer.rect.absolute.x + targetLayer.rect.width / 2,
    targetLayer.rect.absolute.y
  ]
  const tr = [
    targetLayer.rect.absolute.x + targetLayer.rect.width,
    targetLayer.rect.absolute.y + targetLayer.rect.height / 2,
  ]
  const tb = [
    targetLayer.rect.absolute.x + targetLayer.rect.width / 2,
    targetLayer.rect.absolute.y + targetLayer.rect.height
  ]
  const tl = [
    targetLayer.rect.absolute.x,
    targetLayer.rect.absolute.y + targetLayer.rect.height / 2,
  ]

  /**
   * Distance line
   */
  const dt = tb[1] < mt ? {
    top: tb[1],
    left: tb[0],
    height: mt - tb[1],
  } : tt[1] < mt ? {
    top: tt[1],
    left: tb[0],
    height: mt - tt[1],
  } : (tt[1] > mt && tt[1] < mb) ? {
    top: mt,
    left: tb[0],
    height: tt[1] - mt,
  } : undefined

  const dr = tl[0] > mr ? {
    top: tl[1],
    left: mr,
    width: tl[0] - mr,
  } : tr[0] > mr ? {
    top: tl[1],
    left: mr,
    width: tr[0] - mr,
  } : (tr[0] < mr && tr[0] > ml) ? {
    top: tl[1],
    left: tr[0],
    width: mr - tr[0],
  } : undefined

  const db = tt[1] > mb ? {
    top: mb,
    left: tt[0],
    height: tt[1] - mb,
  } : tb[1] > mb ? {
    top: mb,
    left: tt[0],
    height: tb[1] - mb,
  } : (tb[1] < mb && tb[1] > mt) ? {
    top: tb[1],
    left: tt[0],
    height: mb - tb[1],
  } : undefined

  const dl = tr[0] < ml ? {
    top: tl[1],
    left: tr[0],
    width: ml - tr[0],
  } : tl[0] < ml ? {
    top: tl[1],
    left: tl[0],
    width: ml - tl[0],
  } : (tl[0] > ml && tl[0] < mr) ? {
    top: tl[1],
    left: ml,
    width: tl[0] - ml,
  } : undefined

  return (
    <>
      {dt && (
        <div
          className={classes.distanceVertical}
          style={dt}
        >
          <div className={classes.value}>
            <Text size="xs">{dt.height}pt</Text>
          </div>
        </div>
      )}
      {dr && (
        <div
          className={classes.distanceHorizontal}
          style={dr}
        >
          <div className={classes.value}>
            <Text size="xs">{dr.width}pt</Text>
          </div>
        </div>
      )}
      {db && (
        <div
          className={classes.distanceVertical}
          style={db}
        >
          <div className={classes.value}>
            <Text size="xs">{db.height}pt</Text>
          </div>
        </div>
      )}
      {dl && (
        <div
          className={classes.distanceHorizontal}
          style={dl}
        >
          <div className={classes.value}>
            <Text size="xs">{dl.width}pt</Text>
          </div>
        </div>
      )}
    </>
  );
};

export default Distances;
