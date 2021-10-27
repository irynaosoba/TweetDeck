import React from "react";
import './welcome-page.css';

import {AiFillTwitterSquare} from 'react-icons/ai'
import TwitterLogin from "react-twitter-login";

interface Properties {
    readonly onLogin: (data: {
        user_id: string,
        screen_name: string,
        name: string,
        text: string,
        oauth_token: string,
        oauth_token_secret: string,
    }) => void,
    readonly consumerKey: string,
    readonly consumerSecret: string,
}

class WelcomePage extends React.Component<Properties, {}> {
    render() {
        return (
            <div className='welcome-page'>
                <div className='welcome-page-img'>
                    <div className='welcome-page-content'>

                        <div>
                            <div className='tweetdeck-logo'>
                                <AiFillTwitterSquare className='twitter-icon'/>
                                <div className='tweetdeck-logo-text'>TweetDeck</div>
                            </div>
                            <h1>Tweet like a pro.</h1>
                            <div className='welcome-page-description'>
                                The most powerful Twitter tool for real-time tracking, organizing, and engagement. Reach
                                your audiences and discover the best of Twitter.
                            </div>
                        </div>


                        <div className='twitter-login-window'>
                            <div>Log in with your Twitter account</div>
                            <div>
                                <TwitterLogin
                                    buttonTheme={"dark"}
                                    consumerKey={this.props.consumerKey}
                                    consumerSecret={this.props.consumerSecret}
                                    authCallback={(err, data) => {
                                        if (!err) {
                                            this.props.onLogin(data)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomePage;