// higher order componenet (HOC) - A react component that renders another component
// goal is to reuse code, done with:
//  render hijacking
//  prop manipulation
//  abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (

    <div>
        <h1>Info</h1>
        <p>The info is: {props.info} </p>
    </div>

);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin &&
                <p>This is private info.  Any sharing of this info will violate HIPAA protections. Do not share.</p>
            }
            <WrappedComponent {...props} /> {/* <--- This is the higher order component */}
        </div>
    );
};

//requireAuthentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (

        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                    <p>Please loging to view info</p>
                )
            }
        </div>

    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={false} info="This is the detail." />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the detail." />, document.getElementById('app'));