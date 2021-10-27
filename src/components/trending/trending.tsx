import React from 'react';
import './trending.css'

interface Properties {
    readonly className?: string,
    readonly name?: string,
    readonly index?: number,
    readonly tweetCount?: number,
}

class Trending extends React.Component<Properties, any> {
    render() {
        return (
            <div className='trending-item'>
                <div className='trending-item-number'>{this.props.index}</div>
                <div className='trend'>
                    <div>{this.props.name}</div>
                    {this.props.tweetCount ?
                        <div className='tweet-count'>Tweets:  {this.props.tweetCount}</div>
                    : undefined}
                </div>
            </div>
        )
    }
}

export default Trending;