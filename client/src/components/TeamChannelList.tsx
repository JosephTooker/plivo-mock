import React from 'react'
import { GrAddCircle } from 'react-icons/gr'

const TeamChannelList = ({ children, error = false, loading, type }) => {
    if(error) {
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection error, please try again later.
                </p>
            </div>
        ) : null
    }

    if(loading) {
        return (
            <div className='team-channel-list'>
                <p className='team-channel-list__message loading'>
                    {type === 'team' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }

    return (
        <div className='team-channel-list'>
            <div className='team-channel-list__header'>
                <p className='team-channel__header__title'>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList