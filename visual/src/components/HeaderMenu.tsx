import  { FC } from 'react';
import { useAuth } from '../features/auth';
import { Header } from './Header';
import {Link, RouterState, useRouterState } from '@tanstack/react-router';
import { LinkText, Typography} from '../shared/ui/Typography';
import { AUTH_PATH, RESET_PATH } from '../routes/__root';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { COLORS_TEXT } from '../shared/ui/colors';
import { tokenService } from '../services/storage/Factory';
import { apiService } from '../services/api/ApiService';

export const HeaderMenu: FC = function HeaderMenu() {
    const {isAuthenticated, user} = useAuth()
    const routes: RouterState = useRouterState()
  return <Header>
    {!isAuthenticated && (AUTH_PATH.includes(routes.location.pathname) 
    || routes.location.pathname.includes(RESET_PATH)) ? (
        <div className="flex justify-center gap-12 items-center">
            <LinkText text='Авторизация' to='/login'/>
            <LinkText text='Регистрация' to='/register'/>
        </div>
    ) : (
      <div className="flex justify-between px-4 items-center">
        <Link to="/">
          <HomeIcon sx={{color: 'white'}} />
        </Link>
        <div>
          <Typography color={COLORS_TEXT.alternative} weight={600}>
            {`${user?.fullName}`}
          </Typography>
          <Typography 
            color={COLORS_TEXT.alternative} 
            weight={600}
            align='center'
          >
            {`${user?.email}`}
          </Typography>
        </div>
        <Link>
          <ExitToAppIcon sx={{color: 'white'}} onClick={() => {
              tokenService.deleteValue()
              apiService.deleteBearerToken()
              location.reload()
          }}/>
        </Link>
      </div>
    )}
  </Header>
};