import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import { TbShoe } from 'react-icons/tb'
import { FiLogOut } from 'react-icons/fi'

const SideBar = () => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <TbShoe />
            </div>
        </div>

        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner'>
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

const ChannelListContainer = () => {
  return (
    <>
        <SideBar />
        <div className='channel-list__list__wrapper'>
            <CompanyHeader />
            <ChannelSearch />
            <ChannelList 
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="team"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        type='team'
                    />
                )}
            />

            <ChannelList 
                filters={{}}
                channelRenderFilterFn={() => {}}
                List={(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type="messaging"
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        type='messaging'
                    />
                )}
            />
        </div>
    </>
  )
}

export default ChannelListContainer