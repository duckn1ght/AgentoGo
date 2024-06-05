import  { FC } from 'react';
import { useAuth } from '../features/auth';
import { Header } from './Header';
import {Link, RouterState, useRouterState } from '@tanstack/react-router';
import { LinkText, Typography} from '../shared/ui/Typography';
import { AUTH_PATH } from '../routes/__root';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { COLORS_TEXT } from '../shared/ui/colors';

export const HeaderMenu: FC = function HeaderMenu() {
    const {isAuthenticated, user} = useAuth()
    const routes: RouterState = useRouterState()

  return <Header>
    {!isAuthenticated && AUTH_PATH.includes(routes.location.pathname) ? (
        <div className="flex justify-center gap-12">
            <LinkText text='Авторизация' to='/login'/>
            <LinkText text='Регистрация' to='/register'/>
        </div>
    ) : (
      <div className="flex justify-between px-4">
        <Link to="/">
          <HomeIcon sx={{color: 'white'}} />
        </Link>
        <div>
          <Typography color={COLORS_TEXT.alternative} weight={600}>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography 
            color={COLORS_TEXT.alternative} 
            weight={600}
            align='center'
          >
            {`@${user?.username}`}
          </Typography>
        </div>
        <ExitToAppIcon sx={{color: 'white'}} />
      </div>
    )}
  </Header>
};