import styled from 'styled-components';

import { Color } from '@trezor/theme';
import {
    FrameProps,
    FramePropsKeys,
    pickAndPrepareFrameProps,
    withFrameProps,
} from '../../../utils/frameProps';
import { makePropsTransient, TransientProps } from '../../../utils/transientProps';
import { TextProps as TextPropsCommon, TextPropsKeys, withTextProps } from '../utils';

export const allowedHeadingTextProps: TextPropsKeys[] = ['typographyStyle', 'textWrap'];
type AllowedHeadingTextProps = Pick<TextPropsCommon, (typeof allowedHeadingTextProps)[number]>;

export const allowedHeadingFrameProps = ['margin'] as const satisfies FramePropsKeys[];
type AllowedFrameProps = Pick<FrameProps, (typeof allowedHeadingFrameProps)[number]>;

type Align = 'left' | 'center' | 'right';

type HeadingProps = TransientProps<AllowedFrameProps> &
    TransientProps<AllowedHeadingTextProps> & {
        $align?: Align;
        $color?: Color;
    };

const Heading = styled.h1<HeadingProps>`
    ${({ $color, theme }) => $color && `color: ${theme[$color]}`};
    ${({ $align = 'left' }) => `text-align: ${$align};`}

    ${withTextProps}
    ${withFrameProps}
`;

type HProps = AllowedFrameProps &
    AllowedHeadingTextProps & {
        color?: Color;
        align?: Align;
        children: React.ReactNode;
        onClick?: () => void;
        'data-testid'?: string;
    };

export const H1 = ({
    color,
    align,
    typographyStyle = 'titleLarge',
    textWrap,
    onClick,
    'data-testid': dataTest,
    children,
    ...rest
}: HProps) => {
    const frameProps = pickAndPrepareFrameProps(rest, allowedHeadingFrameProps);

    return (
        <Heading
            as="h1"
            onClick={onClick}
            data-testid={dataTest}
            {...makePropsTransient({ color, align, typographyStyle, textWrap })}
            {...frameProps}
        >
            {children}
        </Heading>
    );
};

export const H2 = ({
    color,
    align,
    typographyStyle = 'titleMedium',
    textWrap,
    onClick,
    'data-testid': dataTest,
    children,
    ...rest
}: HProps) => {
    const frameProps = pickAndPrepareFrameProps(rest, allowedHeadingFrameProps);

    return (
        <Heading
            as="h2"
            onClick={onClick}
            data-testid={dataTest}
            {...makePropsTransient({ color, align, typographyStyle, textWrap })}
            {...frameProps}
        >
            {children}
        </Heading>
    );
};

export const H3 = ({
    color,
    align,
    typographyStyle = 'titleSmall',
    textWrap,
    onClick,
    'data-testid': dataTest,
    children,
    ...rest
}: HProps) => {
    const frameProps = pickAndPrepareFrameProps(rest, allowedHeadingFrameProps);

    return (
        <Heading
            as="h3"
            onClick={onClick}
            data-testid={dataTest}
            {...makePropsTransient({ color, align, typographyStyle, textWrap })}
            {...frameProps}
        >
            {children}
        </Heading>
    );
};
