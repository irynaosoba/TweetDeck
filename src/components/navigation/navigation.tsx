import React from "react";
import './navigation.css'

import {
    GiFeather,
    FiSearch,
    BiHomeCircle,
    ImFire,
    BiBell,
    MdLocalPostOffice,
    FiPlus,
    RiArrowLeftRightFill,
    BsPeople,
    IoSettingsOutline,
    AiFillTwitterSquare,
} from 'react-icons/all'
import NavigationItem from "../navigation-item/navigation-item";
import ColumnHeader from "../column-header/column-header";
import NewTweetColumn from "../new-tweet-column/new-tweet-column";
import SearchWindow from "../search-window/search-window";

interface Properties {
    readonly changeNavStyle?: void | undefined,
    readonly changeNewTweetStyle?: void | undefined,
    readonly openSearchWindow?: void | undefined,
    readonly screenName?: string,
    readonly displayName?: string,
    readonly  profileImg?: string,
}

interface State {
    fullSize: boolean,
    newTweetColumn: boolean,
    openSearchWindow: boolean,
}

class Navigation extends React.Component<Properties, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            fullSize: false,
            newTweetColumn: false,
            openSearchWindow: false,
        }
    };

    changeNavStyle = () => {
        this.setState((state) => {
            return {
                fullSize: !state.fullSize
            }
        })
    }

    changeNewTweetStyle = () => {
        this.setState((state) => {
            return {newTweetColumn: !state.newTweetColumn
            }
        })
    }

    openSearchWindow = () => {
        this.setState((state) => {
            return {openSearchWindow: !state.openSearchWindow
            }
        })
    }

    render() {
        return (
            <div className='navigator-container'>
                <div className={!this.state.fullSize ? 'app-navigator' : 'app-navigator-full-size'}>
                    <NavigationItem className='newTweet-btn' btnHint='New Tweet'
                                    onClick={this.changeNewTweetStyle}>
                        <GiFeather className='newTweet-btn-svg'/>
                        <p className='newTweet-title'>Tweet</p>
                    </NavigationItem>
                    <NavigationItem className='search-btn' btnHint='Search'
                                    onClick={this.openSearchWindow}>
                        <FiSearch className='search-btn-svg'/>
                        <input className='search-btn-input' placeholder='Search Twitter'/>
                    </NavigationItem>
                    <NavigationItem className='section-btn hoverable-btn' value='Home'  btnHint='Home' screenName={this.props.screenName}>
                        <BiHomeCircle className='section-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='section-btn hoverable-btn' value='Trending' btnHint='Trending'>
                        <ImFire className='section-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='section-btn hoverable-btn' value='Notifications' btnHint='Notifications' screenName={this.props.screenName}>
                        <BiBell className='section-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='line-btn hoverable-btn' value='Messages' btnHint='Messages'>
                        <MdLocalPostOffice className='section-btn-svg'/>
                    </NavigationItem>
                    <div className='line-btn-border'></div>
                    <NavigationItem className='line-btn line-btn-space hoverable-btn' value='Add column'
                                    btnHint='Add column'>
                        <FiPlus className='additional-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='additional-btn hoverable-btn'
                                    onClick={this.changeNavStyle} value='Collapse' btnHint='Expand'>
                        <RiArrowLeftRightFill className='additional-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='additional-btn hoverable-btn' value='Accounts' btnHint='Accounts'>
                        <BsPeople className='additional-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='additional-btn hoverable-btn' value='Settings' btnHint='Settings'>
                        <IoSettingsOutline className='additional-btn-svg'/>
                    </NavigationItem>
                    <NavigationItem className='additional-btn' value={this.props.displayName} screenName={this.props.screenName}>
                       <img className='profile-img' src={this.props.profileImg} alt='profile-img'/>
                    </NavigationItem>
                    <NavigationItem className='additional-btn' value='TweetDeck'>
                        <AiFillTwitterSquare className='additional-btn-svg'/>
                    </NavigationItem>
                </div>

                <NewTweetColumn className={!this.state.newTweetColumn ? 'none-tweet-column' : 'new-tweet-column'}>
                    <ColumnHeader className='new-tweet-header'/>
                </NewTweetColumn>
                <SearchWindow className={!this.state.openSearchWindow ? 'no-search-window' : 'search-window'}/>
            </div>
        )
    }
}

export default Navigation;