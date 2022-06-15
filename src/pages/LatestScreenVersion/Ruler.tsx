import { FC } from "react";
import { DlLayer } from "../../types";

export interface RulerProps {
  mainLayer: DlLayer;
  targetLayer: DlLayer;
}

const Ruler: FC<RulerProps> = ({ mainLayer, targetLayer }) => {
  console.log(mainLayer.rect.absolute, targetLayer.rect.absolute);

  return <div />;
};

export default Ruler;
