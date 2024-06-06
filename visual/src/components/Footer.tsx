import {FC, HTMLAttributes} from "react"
import { COLORS_BACKGROUND } from "../shared/ui/colors"

export const Footer:FC<HTMLAttributes<HTMLElement>> = function Footer(props){

    return <footer className={`${COLORS_BACKGROUND.primary} py-3 ${props.className} fixed left-0 bottom-0 w-full`}>
        {props.children}
    </footer>
}