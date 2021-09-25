import React, {useRef, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams, useHistory, useRouteMatch
} from "react-router-dom";
import {useEventListener} from "ahooks";
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import '@ant-design/pro-card/dist/card.css';
import 'antd/dist/antd.css';
import {useFullscreen} from 'ahooks';
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} from 'react-live'


// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function ParamsExample() {
    const hist = useHistory();
    const index = useRef(0);
    const keyDownHandler = (ev) => {
        console.log(ev.code);
        if (ev.code === 'ArrowUp' || ev.code === 'ArrowRight') {
            index.current++;
            hist.push(`/${index.current}`);
        }
        if ((ev.code === 'ArrowDown' || ev.code === 'ArrowLeft') && index.current > 0) {
            index.current--;
            hist.push(`/${index.current}`);
        }

    };
    useEventListener('keydown', keyDownHandler);
    return (
        <div>
            {/*<h2>Header</h2>*/}
            <Switch>
                <Route path="/:id" children={<Slide/>}/>
            </Switch>
        </div>
    );
}

function Slide() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let {id} = useParams();

    const [responsive, setResponsive] = useState(false);
    const ref = useRef();
    const [isFullscreen, {setFull, exitFull, toggleFull}] = useFullscreen(ref);


    return (
        <div style={{height: '100vh'}}>

            <RcResizeObserver
                key="resize-observer"
                onResize={(offset) => {
                    setResponsive(offset.width < 596);
                }}
            >
                <LiveProvider code="<strong>Hello World!</strong>">


                    <ProCard
                        title="左右分栏带标题"
                        extra="2019年9月28日"
                        split={responsive ? 'horizontal' : 'vertical'}
                        bordered
                        headerBordered

                        style={{height: '100%', marginTop: 24}}


                    >
                        <ProCard title="左侧详情"
                                 style={{height: '100%'}}

                                 colSpan="50%">
                            <div >左侧内容</div>

                            <LiveEditor/>



                        </ProCard>
                        <ProCard title="流量占用情况"
                                 style={{height: '100%'}}
                                 ref={ref}
                        >

                            as {id}

                            <div style={{background: 'white'}}>
                                <div style={{marginBottom: 16}}>{isFullscreen ? 'Fullscreen' : 'Not fullscreen'}</div>
                                <div>
                                    <button type="button" onClick={setFull}>
                                        setFull
                                    </button>
                                    <button type="button" onClick={exitFull} style={{margin: '0 8px'}}>
                                        exitFull
                                    </button>
                                    <button type="button" onClick={toggleFull}>
                                        toggle
                                    </button>
                                </div>
                                <LiveError/>
                                <LivePreview/>

                            </div>


                        </ProCard>
                    </ProCard>

                </LiveProvider>

            </RcResizeObserver>

        </div>
    );

}
