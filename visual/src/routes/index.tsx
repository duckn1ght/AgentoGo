import { createFileRoute } from "@tanstack/react-router";
import { MainPage } from "../pages/main/MainPage";
import { ProfilePage } from '../pages/profile/ProfilePage';

export const Route = createFileRoute("/")({
    component: ProfilePage,
    staticData:{
        title:"Главный экран"
    }
});
