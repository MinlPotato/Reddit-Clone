import { useState } from "react"
import { leaveMember, joinMember, getMember } from "../services/communityService"
import { addNewCommunity, leaveCommunity } from "../State/Slices/CommunitySlice"
import { useDispatch } from "react-redux"

function MemberJoinButton(params) {

    const info = params.info
    const communityData = params.communityData
    const customClasses = params.className
    const dispatch = useDispatch()

    const [IsMember, setIsMember] = useState(false)


    const handleJoin = (e) => {
        e.stopPropagation()
        if (IsMember) {
            leaveMember({user_id: info.user_id, community_id: info.community_id}).then(() => setIsMember(false))
            dispatch(leaveCommunity(communityData))
        } else {
            joinMember({user_id: info.user_id, community_id: info.community_id}).then(() => setIsMember(true))
            dispatch(addNewCommunity(communityData))
        }
    }

    getMember({user_id: info.user_id, community_id: info.community_id}).then((response) => setIsMember(response))
    
    return IsMember ? 
    (
        <button onClick={handleJoin} title="Joined" className={`${customClasses} flex items-center justify-center border-white bg-transparent hover:bg-neutral-800 font-semibold rounded-full`}>
            <p className="text-white text-lg">Joined</p>
        </button>
    ) : (
        <button onClick={handleJoin} className={`${customClasses} flex items-center justify-center bg-neutral-200 hover:bg-neutral-300 font-semibold rounded-full`}>
            <p className="text-black text-lg">Join</p>
        </button>
    )

}

export default MemberJoinButton