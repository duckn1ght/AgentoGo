import  { FC, useCallback } from 'react';
import { Link } from '@tanstack/react-router';


export interface NavMenuItem{
    index:number,
    img:JSX.Element,
}

interface Props {
    data: NavMenuItem[],
    activeIndex:number,
    onChangeIndex: (index:number) => void
}

export const NavMenu: FC<Props> = function NavMenu(props) {
    const styles = `flex justify-between px-8`
    const renderItem = useCallback(
        (item:NavMenuItem) =>(
            <li key={String(item.index)}>
            <Link
              to="/"
              className="flex justify-center items-center flex-col p-2"
              onClick={() => props.onChangeIndex(item.index)}
            >
              {item.img}
            </Link>
          </li>
    ), [props.activeIndex])
  return <ul className={styles}>{props.data.map(renderItem)}</ul>
};