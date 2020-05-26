import React, { useRef , useState} from 'react';
import EmailEditor from 'react-email-editor'
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';

import NavComp from '../components/emailNavBarComponent.js';
import { saveEmail } from '../actions/emailActions.js';

const EmailTemplate = (props) => {

    const editor = useRef(null);

    const [editorLoaded, seteditorLoaded] = useState(false);

    const onDesignLoad = () => seteditorLoaded(true);    

    var mail = null;
    if(props.emailBody ) mail = props.emailBody

    const onLoad = () => editor.current.loadDesign(mail)

    const saveDesign = () => {
        editor.current.exportHtml(design => {
            props.saveEmail(design);
        })
    }
    //===================Add save notifications later
    if( props.emailName && props.emailID ) 
    return (
            <>
                <NavComp saveDesign={saveDesign}/>
                {
                    props.notification ? (
                        <Alert color="success">{props.notification}</Alert>  
                    ) : null                                                       
                }
                <EmailEditor
                    ref={editor}
                    minHeight="calc(100vh - 85px)"
                    onDesignLoad={onDesignLoad}
                    onLoad={onLoad}
                />
            </>
        );
    else return <Redirect  to="/email-templates"/>
};

const mapStateToProps = state => ({
    emailBody: state.email.email_body,
    emailName: state.email.email_name,
    emailID: state.email.email_id
})

export default connect( mapStateToProps , { saveEmail } )(withRouter(EmailTemplate));
