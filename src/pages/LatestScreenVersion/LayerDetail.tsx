import { FC } from "react";
import { Box, Code, createStyles, Divider, SimpleGrid, Text, Title } from "@mantine/core";

import { DlLayer } from "../../types";
import { getRGBColor } from "../../utils/mixed";

export interface LayerDetailProps {
    data?: DlLayer
}

const useStyles = createStyles((theme) => ({
    colorWrapper: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    colorPreview: {
        width: 34,
        height: 34,
        borderRadius: 2,
        border: `1px solid ${theme.colors.gray[4]}`,
        marginRight: 12,
    },
}))

const LayerDetail: FC<LayerDetailProps> = ({ data }) => {
    const { classes } = useStyles()

    if (!data) {
        return (
            <Text p='md'>No layer selected</Text>
        )
    }

    return (
        <div>
            <Title p='md' order={4}>{data.name}</Title>
            <Divider />
            <SimpleGrid cols={2} p='md'>
                <Box>
                    <Text color='gray' size='sm' inline>
                        X: {data.rect.absolute.x}pt
                    </Text>
                </Box>
                <Box>
                    <Text color='gray' size='sm' inline>
                        Y: {data.rect.absolute.y}pt
                    </Text>
                </Box>
                <Box>
                    <Text color='gray' size='sm' inline>
                        Width: {data.rect.width}pt
                    </Text>
                </Box>
                <Box>
                    <Text color='gray' size='sm' inline>
                        Height: {data.rect.height}pt
                    </Text>
                </Box>
                {!!data.borderRadius && (
                    <Box>
                        <Text color='gray' size='sm' inline>
                            Radius: {data.borderRadius}pt
                        </Text>
                    </Box>
                )}
            </SimpleGrid>
            {!!data.fills?.length && (
                <>
                    <Divider />
                    <Title p='md' order={6}>Colors</Title>
                    {data.fills?.map(item => item.color
                        ? (
                            <Box px='md' className={classes.colorWrapper}>
                                <div className={classes.colorPreview} style={{ backgroundColor: getRGBColor(item.color) }} />
                                <Code key={item.color.sourceId} color='gray'>{getRGBColor(item.color)}</Code>
                            </Box>
                        )
                        : <Code>{JSON.stringify(item.gradient)}</Code>)}
                </>
            )}
            {!!data.textStyles?.length && (
                <>
                    <Divider />
                    <Title p='md' order={6}>Typeface</Title>
                    {data.textStyles.map((item, idx) => (
                        <div key={idx}>
                            <SimpleGrid cols={2} px='md'>
                                <Box>
                                    <Text color='gray' size='sm' inline>
                                        {item.style?.postscriptName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color='gray' size='sm' inline>
                                        Size: {item.style?.fontSize}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color='gray' size='sm' inline style={{textTransform: 'capitalize'}}>
                                        Align: {item.style?.textAlign}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text color='gray' size='sm' inline>
                                        Line Height: {item.style?.lineHeight}
                                    </Text>
                                </Box>
                            </SimpleGrid>
                            {item.style?.color && (
                                <Box p='md' className={classes.colorWrapper}>
                                    <div className={classes.colorPreview} style={{ backgroundColor: getRGBColor(item.style.color) }} />
                                    <Code key={item.style.color.sourceId} color='gray'>{getRGBColor(item.style.color)}</Code>
                                </Box>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default LayerDetail;
