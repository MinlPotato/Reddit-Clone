import { Outlet } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"

function ProfileHeaderLayout(params) {


    return (
        <>
            <ProfileHeader />
            <Outlet />
        </>

    )
}

export default ProfileHeaderLayout