import {BrowserRouter as Router, useHistory, useRouteMatch} from "react-router-dom";
import ParamsExample from "./demo1";
import React from "react";

function Presentation() {
    return (
        <div style={{height: '10vh',
            // 'flex-flow': 'column',
            // display: 'flex'

        }}>
            <Router> <ParamsExample/></Router>
        </div>
    );
}

export default Presentation;