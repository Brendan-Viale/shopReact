import { Outlet } from "react-router"
import { SubHeader } from "./Header/SubHeader"

export const Home = () => {
    return(
        <main>
            <SubHeader />
            <Outlet />
        </main>
    )
}