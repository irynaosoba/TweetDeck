import React from 'react';
import './notification.css';

interface Properties {
    readonly screenName?: string,
    readonly displayName?: string,
}

class Notification extends React.Component<any, any> {
    render() {
        return (
            <div className='notification-item'>
                <div>
                    <span className='user-display-name'>{this.props.displayName}</span>
                    <span className='user-screen-name'>@{this.props.screenName}</span>
                </div>
                <div className='notification-text'>Notification</div>
            </div>
        )
    }
}

export default Notification;