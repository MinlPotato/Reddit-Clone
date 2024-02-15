import { useState } from "react"
import { leaveMember, joinMember, getMember } from "../services/communityService"

function MemberJoinButton(params) {
    
    const info = params.info
    const [IsMember, setIsMember] = useState(false)

    const handleJoin = () => {
        if (IsMember) {
            leaveMember({user_id: info.user_id, community_id: info.community_id}).then(() => setIsMember(false))
        } else {
            joinMember({user_id: info.user_id, community_id: info.community_id}).then(() => setIsMember(true))
        }
    }

    getMember({user_id: info.user_id, community_id: info.community_id}).then((response) => setIsMember(response))
    
    return IsMember ? 
    (
        <button onClick={handleJoin} title="Joined" className="flex items-center justify-center w-24 h-10 border-white bg-transparent hover:bg-neutral-800 font-semibold rounded-full">
            <p className="text-white text-lg">Joined</p>
        </button>
    ) : (
        <button onClick={handleJoin} className="flex items-center justify-center w-24 h-10 bg-neutral-200 hover:bg-neutral-300 font-semibold rounded-full">
            <p className="text-black text-lg">Join</p>
        </button>
    )

}

export default MemberJoinButton