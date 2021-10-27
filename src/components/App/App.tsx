import React from "react";

import Navigation from "../navigation/navigation";
import Column from "../column/column";
import ColumnHeader from '../column-header/column-header';
import WelcomePage from "../welcome-page/welcome-page";
import './app.css';
import TwitterService from "../twitter-service/twitter-service";
import {BiBell, BiHomeCircle, ImFire, HiOutlineAdjustments} from "react-icons/all";
import Tweet from "../tweet/tweet";
import Trending from "../trending/trending";
import Notification from "../notification/notification";

interface Properties {
    readonly onClick?: () => void,
}

interface State {
    isLoggedIn: boolean,
    userId?: string,
    screenName?: string,
    displayName?: string,
    profileImg?: string,
    tweets: string[],
    trends: { name: string, tweetCount: number}[],
    trendList?: string,
    locationId: number,
    tweetCount?: number,
}

const {REACT_APP_CONSUMER_KEY, REACT_APP_CONSUMER_SECRET_KEY} = process.env;

const consumerKey = `${REACT_APP_CONSUMER_KEY}`;
const consumerSecret = `${REACT_APP_CONSUMER_SECRET_KEY}`;

class App extends React.Component<Properties, State> {
    twitterService: TwitterService;

    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: false,
            tweets: [],
            trends: [],
            locationId: 862592,
        }
        this.twitterService = new TwitterService(consumerKey, consumerSecret);
    }

    logIn = (data: {
        user_id: string,
        screen_name: string,
        text: string,
        oauth_token: string,
        oauth_token_secret: string,
    }) => {
        this.twitterService.updateCredentials(data.oauth_token, data.oauth_token_secret);
        this.setState({
            isLoggedIn: true,
            userId: data.user_id,
            screenName: data.screen_name,
        });
    }

    async componentDidUpdate(prevProps: Properties, prevState: State) {
        if (prevState.isLoggedIn !== this.state.isLoggedIn && this.state.isLoggedIn
            && this.state.userId) {
            try {
                const userTimeline = await this.twitterService.getUserTimeline(this.state.userId, 10);
                let tweets = [];
                for (let i = 0; i < userTimeline.length; i++) {
                    let tweetData = userTimeline[i]['text'];
                    tweets.push(tweetData);
                }

                const trendsData = await this.twitterService.getTrend(this.state.locationId);
                let trendsList = [];
                let trends = trendsData[0]['trends'];
                for (let i=0; i<trends.length; i++) {
                    trendsList.push({
                        name: trends[i]['name'],
                        tweetCount: trends[i]['tweet_volume']
                    });
                }

                const userProfile = await this.twitterService.getUser(this.state.userId);
                this.setState({
                    displayName: userProfile.name,
                    profileImg: userProfile.profile_image_url_https,
                    tweets: tweets,
                    trends: trendsList,
                })
            } catch (e) {
            }
        }
    }

    render() {
        return (
            <div className='app-body'>
                {!this.state.isLoggedIn
                    ? <WelcomePage onLogin={this.logIn}
                                   consumerKey={consumerKey}
                                   consumerSecret={consumerSecret}/>
                    : (
                        <div className='app-body'>
                            <Navigation screenName={this.state.screenName} displayName={this.state.displayName}
                                        profileImg={this.state.profileImg}/>
                            <Column className='column-item-first'>
                                <ColumnHeader className='column-header' value='Home' screenName={this.state.screenName}>
                                    <BiHomeCircle className='column-header-svg'/>
                                    <HiOutlineAdjustments className='column-header-menu'/>
                                </ColumnHeader>
                                {this.state.tweets.map(tweet =>
                                    <Tweet
                                        screenName={this.state.screenName}
                                        displayName={this.state.displayName}
                                        profileImg={this.state.profileImg}
                                        tweet={tweet}
                                    />)
                                }
                            </Column>
                            <Column className='column-item-second'>
                                <ColumnHeader className='column-header' value='Notifications'
                                              screenName={this.state.screenName}>
                                    <BiBell className='column-header-svg'/>
                                    <HiOutlineAdjustments className='column-header-menu'/>
                                </ColumnHeader>
                                <Notification
                                    screenName={this.state.screenName}
                                    displayName={this.state.displayName}
                                />
                            </Column>
                            <Column className='column-item-third'>
                                <ColumnHeader className='column-header' value='Trending'>
                                    <ImFire className='column-header-svg'/>
                                    <HiOutlineAdjustments className='column-header-menu'/>
                                </ColumnHeader>
                                {this.state.trends.map((trend, index) =>
                                    <Trending
                                        index={index + 1}
                                        name={trend.name}
                                        tweetCount={trend.tweetCount}
                                    />)
                                }
                            </Column>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default App;