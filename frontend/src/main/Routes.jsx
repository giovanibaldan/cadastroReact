import { Route , Routes } from "react-router-dom"
import Login from "../components/Login";
import Users from "../components/Users";

function MainRoutes(props){

    return (
        <Routes>
            <Route path='/' element=<Login/> />
            <Route path='/users' element=<Users/> />
        </Routes>
    )

}

export default MainRoutes;