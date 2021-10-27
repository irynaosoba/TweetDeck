import React from 'react';
import './tweet.css';
import {FaRegComment, AiOutlineRetweet, FiHeart, CgMore} from 'react-icons/all';

interface Properties {
    readonly className?: string,
    readonly screenName?: string,
    readonly displayName?: string,
    readonly profileImg?: string,
    readonly tweet?: string,
}

class Tweet extends React.Component<Properties, any> {
    render() {
        return (
            <div className='tweet-box'>
                <div>
                    <img src={this.props.profileImg} className='tweet-profile-img' alt='profile-img'/>
                </div>
                <div>
                    <span className='tweet-user-name'>{this.props.displayName}</span>
                    <span className='tweet-user-screen-name'>@{this.props.screenName}</span>
                    <p className='tweet-text'>{this.props.tweet}</p>
                    <div className='tweet-add'>
                        <div><FaRegComment/></div>
                        <div><AiOutlineRetweet/></div>
                        <div><FiHeart/></div>
                        <div><CgMore/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tweet;