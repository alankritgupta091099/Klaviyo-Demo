import React,{Component} from 'react';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import Modal from 'react-bootstrap/Modal';

export default class Example  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'content'
        }
    }

    updateContent = (value) => {
        this.setState({content:value})
        console.log(this.state.content);
    }
    sendData = () => {
        this.props.parentCallback(this.state.content);
   }
    /**
     * @property 
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
		readonly: false 
	}
    render() {
        return (
            <>
            <Modal show={this.props.editorOpen}
                onHide={this.props.handleTextEditorOpen}>
            <JoditEditor
                
            	editorRef={this.setRef}
                value={this.state.content}
                config={this.config}
                onChange={this.updateContent}
            />
            <button class="btn btn-primary" onClick={this.updateContent}>Update</button>
            </Modal>
            </>
        );
    }
}