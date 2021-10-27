import React, {Component} from 'react'
import './new-tweet-column.css';

import Dropzone from 'react-dropzone';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    BsCircle,
    BsBoundingBox,
    FaListUl,
    RiImageAddLine,
    MdSchedule,
    FiMail
} from 'react-icons/all';

interface Properties {
    readonly className?: string,
    readonly value?: string,
    readonly date?: Date | null,
    readonly onInput?: (value: string) => void,
    readonly onChange?: (value: Date | null) => void,
}

interface State {
    textAreaValue: string,
    isScheduled: boolean,
    scheduledDate: string | undefined,
}

class NewTweetColumn extends Component<Properties, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            textAreaValue: '',
            isScheduled: true,
            scheduledDate: '',
        }
    }

    handleChange = (event: { target: HTMLInputElement } & any) =>
        this.setState({textAreaValue: event.target.value});


    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
                <div className='tweet-author-text'>From</div>
                <div className='profile-picture'>
                    <div></div>
                    <div className='prof-pic-format'>
                        <BsCircle className='profile-picture-format'/>
                        <BsBoundingBox className='profile-picture-format'/>
                        <FaListUl className='profile-picture-format'/>
                    </div>
                </div>
                <div className='tweet-author-text'>Tweet</div>
                <textarea placeholder="What's happening?"
                          value={this.state.textAreaValue}
                          onInput={this.handleChange}/>
                <button className={this.state.textAreaValue === '' ? 'postTweet' : 'filledTweet'}>Tweet</button>
                <div>
                </div>
                <div>
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <button className='additional-features'>
                                        <RiImageAddLine className='additional-features-img'/>
                                        <div className='additional-features-text'>
                                            Add images or video
                                        </div>
                                    </button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div>
                    <button className='additional-features scheduled-tweet'
                            onClick={() => this.setState({isScheduled: !this.state.isScheduled})}>
                        <MdSchedule className='additional-features-img'/>
                        <span className='additional-features-text'>
                            {!this.state.scheduledDate ? 'Schedule Tweet' : this.props.value}
                        </span>
                    </button>
                    <DatePicker wrapperClassName='datePicker'
                                showTimeSelect
                                autoFocus
                                value={this.state.scheduledDate}
                                onChange={(date: Date | null) => this.setState({scheduledDate: date?.toDateString()})}/>
                </div>
                <div>
                    <button className='additional-features'>
                        <FiMail className='additional-features-img'/>
                        <div className='additional-features-text'>Direct message</div>
                    </button>
                </div>
                <div className='stay-open-btn'>
                    <span>Stay open</span>
                    <input type='checkbox'/>
                </div>
            </div>
        )
    }
}

export default NewTweetColumn;