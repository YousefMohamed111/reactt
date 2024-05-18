import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Meal from "../Meal/Meal";
import Question from "../question&&answer/question&&answer";
import Aboutus from "../Aboutus/Aboutus";
import End from "../End/End";
import Visit from "../Visit/visit";
function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Meal />
            <Aboutus />
            <Visit />
            <Question />
            <End />
        </>
    )
}
export default Layout;