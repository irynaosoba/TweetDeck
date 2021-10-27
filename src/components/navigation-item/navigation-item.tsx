import React from "react";
import './navigation-item.css'

interface Properties {
    readonly className?: string,
    readonly value?: string,
    readonly btnHint?: string,
    readonly placeholder?: string,
    readonly onClick?: () => void | boolean | undefined,
    readonly screenName?: string | undefined,
}

class NavigationItem extends React.Component<Properties, {}> {

    render() {
        return (
            <div>
                <button
                    className={this.props.className}
                    onClick={this.props.onClick}>
                    {this.props.children}
                    {this.props.btnHint
                        ? <div className='item-hint'>{this.props.btnHint}</div>
                        : null}
                </button>
                {this.props.value
                    ? <span className={this.props.value !== 'TweetDeck' ? 'btn-item-title' : 'tweet-deck'}>
                         {this.props.value}
                        <p className='user-data'>{this.props.screenName}</p>
                        </span>
                    :
                    null
                }
            </div>
        );
    }

}

export default NavigationItem;