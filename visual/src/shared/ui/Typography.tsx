import  { FC, HTMLAttributes } from 'react';
import { COLORS_TEXT } from './colors';
import { Link, LinkProps } from '@tanstack/react-router';

type TEXT_SIZE = 24 | 20 | 18 | 16 |14 |12

type TEXT_WEIGHT = 700 | 600 | 500 | 400

type TEXT_ALIGN = "left" | "center" | "right"

const STYLE_SIZE =  {
  24: "text-2xl",
  20: "text-xl",
  18: "text-lg",
  16: "text-base",
  14: "text-sm",
  12: "text-xs"
}

const STYLE_WEIGHT = {
  700: "font-bold",
  600: "font-semibold",
  500: "font-medium",
  400: "font-normal"
}

const STYLE_ALIGN = {
left: "text-left",
center: "text-center",
right: "text-right"
}

interface TypographyProps  extends HTMLAttributes<HTMLParagraphElement>
{
    size?: TEXT_SIZE
    weight?: TEXT_WEIGHT
    color?:string
    align?: TEXT_ALIGN
}

export const Typography: FC<TypographyProps> = function Typography(props) {
  const {
    size = 16,
    weight = 400,
    color = COLORS_TEXT.primary,
    align = "left",
    ...rest
  } = props

  const styles = `${STYLE_SIZE[size]} ${STYLE_WEIGHT[weight]} ${color} ${STYLE_ALIGN[align]} ${props.className}`

  return <p {...rest} className={styles}>
    {props.children}
  </p>
};
interface LinkTextProps extends Omit<LinkProps, "children">{
  size?:TEXT_SIZE,
  weight?:TEXT_WEIGHT,
  color?:string
  align?:TEXT_ALIGN,
  text?:string
}

export const LinkText: FC<LinkTextProps> = function LinkText(props) {
  const {size = 24, weight = 600, color, align="left", ...rest} = props
  const styles = `${STYLE_SIZE[size]} ${STYLE_ALIGN[align]} ${STYLE_WEIGHT[weight]} ${props.className}`
  return (
    <Link
      {...rest}
      children={props.text}
      className={`${styles} ${props.className}`}
      inactiveProps={{className: COLORS_TEXT.alternative}}
      activeProps={{className: COLORS_TEXT.main300}}
    />
  )
}