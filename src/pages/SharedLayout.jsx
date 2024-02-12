import { Outlet } from "react-router-dom";
import FixedNavbar from "../components/FixedNavbar";

export default function SharedLayout() {
    return (
        <>
            <FixedNavbar />

            <Outlet />
        </>
    );
}
