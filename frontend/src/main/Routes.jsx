import { Route, Routes } from "react-router-dom"
import Start from "../components/Start";
import Users from "../components/Users";

function MainRoutes(props) {

    return (
        <Routes>
            <Route path='/' element=<Start /> />
            <Route path='/users' element=<Users /> />
        </Routes>
    )

}

export default MainRoutes;
