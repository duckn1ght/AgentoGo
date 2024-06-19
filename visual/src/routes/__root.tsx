import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";
import { RootRouteContext } from "../types/tanstack";
import { HeaderMenu } from "../components/HeaderMenu";
import { tokenService } from "../services/storage/Factory";
import { useAuth } from "../features/auth";
import { InitPage } from "../pages/init/InitPage";
import { FooterMenu } from "../components/FooterMenu";

export const AUTH_PATH = ["/login","/register","/forgot-password"]
export const RESET_PATH = "/change-password"

export const Route = createRootRouteWithContext<RootRouteContext>()({
    component: () => {
        const {token, isAuthenticated} = useAuth()

        if(token && !isAuthenticated){
            return <InitPage />
        }

        return(
        <>
        <div className="flex flex-col h-screen">
            <HeaderMenu/>
            <div className="p-2">
                <Outlet />
            </div>
            <FooterMenu/>
        </div>
        </>
        )
    },
    beforeLoad: (options) =>{
        if(
            !AUTH_PATH.includes(options.location.pathname) && 
            !options.location.pathname.includes(RESET_PATH) &&
            !tokenService.hasValue()
        ){
            throw redirect({to:"/login"})
        }
        else if(AUTH_PATH.includes(options.location.pathname) &&
            tokenService.hasValue()){
                throw redirect({to:"/"})
        }
    }
});