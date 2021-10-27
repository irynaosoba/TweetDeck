import React from 'react';
import './search-window.css'
import {FiSearch} from "react-icons/all";


interface Properties {
    readonly className?: string,
}

class SearchWindow extends React.Component<Properties, any> {
    render() {
        return (
            <div className={this.props.className}>
                <input placeholder='Search'/>
                <FiSearch />
            </div>
        )
    }
}

export default SearchWindow;