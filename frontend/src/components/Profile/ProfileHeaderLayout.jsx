import { Outlet } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"

function ProfileHeaderLayout() {


    return (
        <>
            <ProfileHeader />
            <Outlet />
        </>

    )
}

export default ProfileHeaderLayout