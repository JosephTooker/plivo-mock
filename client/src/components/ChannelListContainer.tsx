import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import { TbShoe } from 'react-icons/tb'
import { FiLogOut } from 'react-icons/fi'

const cookies = new Cookies()

const SideBar = ({ logout }) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <TbShoe />
            </div>
        </div>

        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <FiLogOut />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Customer Service</p>
    </div>
)

const customeChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}
const customeMessagingTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    const { client } = useChatContext()

    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId")
        cookies.remove("email")
        cookies.remove("firstName")
        cookies.remove("lastName")
        cookies.remove("userTypre")
        cookies.remove("hashedPassword")

        window.location.href = "http://localhost:3000/"
    }

    const filters = { members: { $in: [client.userID] } }

  return (
    <>
        <SideBar logout={logout}/>
        <div className='channel-list__list__wrapper'>
            <CompanyHeader />
            {/*<ChannelSearch />*/}
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customeChannelTeamFilter}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="team"
                        isCreating={isCreating} 
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        type='team'
                    />
                )}
            />

            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customeMessagingTeamFilter}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="messaging"
                        isCreating={isCreating} 
                        setCreateType={setCreateType}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        type='messaging'
                    />
                )}
            />
        </div>
    </>
  )
}

const ChannelListContainer = ({ setIsCreating, setCreateType, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return(
        <>
            <div className='channel-list__container'>
                <ChannelListContent  
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                />
            </div>
        </>
    )
}

export default ChannelListContainer