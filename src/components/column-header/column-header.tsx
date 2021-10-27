import React from "react";
import './column-header.css';

interface Properties {
    readonly className?: string,
    readonly value?: string,
    readonly screenName?: string,
}

class ColumnHeader extends React.Component<Properties, any> {
    render() {
        return (
                <div className={this.props.className}>
                    {this.props.children}
                    <span className='column-header-value'>{this.props.value}</span>
                    <span className='column-screen-name'>{this.props.screenName}</span>
                </div>
        );
    }
}

export default ColumnHeader;