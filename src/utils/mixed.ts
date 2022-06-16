import { ColorData } from "@zeplin/sdk";

export const getRGBColor = (color: ColorData) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
