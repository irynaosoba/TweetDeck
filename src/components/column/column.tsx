import React from "react";
import './column.css';

interface Properties {
    readonly className?: string,
}

class Column extends React.Component<Properties, any> {
    render() {
        return (
            <div className='column-item'>
                {this.props.children}
            </div>
        );
    }
}

export default Column;