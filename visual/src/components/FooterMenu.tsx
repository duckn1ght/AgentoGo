import { FC, useState } from "react";
import { useAuth } from "../features/auth";
import { Link, RouterState, useRouterState } from "@tanstack/react-router";
import { AUTH_PATH, RESET_PATH } from "../routes/__root";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from '@mui/icons-material/Person';
import { Footer } from "./Footer";
import { NavMenu } from "../shared/ui/NavMenu";

const NAV_MENU_ITEMS = [
    {
        index: 1,
        img: <HomeIcon sx={{color:"gray", fontSize:40}}/>
    },
    {
        index: 2,
        img: <FormatListBulletedIcon sx={{color:"gray", fontSize:40}}/>
    },
    {
        index: 3,
        img: <LocalShippingIcon sx={{color:"gray", fontSize:40}}/>
    },
    {
        index: 4,
        img: <ShoppingCartIcon sx={{color:"gray", fontSize:40}}/>
    },
    {
        index: 5,
        img: <PersonIcon sx={{color:"white", fontSize:40}}/>
    },

]

export const FooterMenu: FC = function FooterMenu() {
  const { isAuthenticated } = useAuth();
  const routes: RouterState = useRouterState();
  const [activeIndex, setActiveIndex] = useState<number>(1)

  return !isAuthenticated && (AUTH_PATH.includes(routes.location.pathname) 
  || routes.location.pathname.includes(RESET_PATH)) ? (
    <Footer className="none" />
  ) : (
    <Footer>
      <nav>
          <NavMenu data={NAV_MENU_ITEMS} activeIndex={activeIndex} onChangeIndex={setActiveIndex}/>
      </nav>
    </Footer>
  );
};
