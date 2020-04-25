import React from 'react';
import {PanelGroup,Panel} from 'rsuite';
import FeedDisplayCard from './feed-tag';

function DisplayFeeds() {
    return (
        <div>
            <PanelGroup accordion>
            <Panel header="Feed 1" >
             <FeedDisplayCard feed={"feed 1"} />
            </Panel>
            <Panel header="Feed 2">
            <FeedDisplayCard feed={"feed 2"} />
            </Panel>
            <Panel header="Feed 3">
            <FeedDisplayCard feed={"feed 3"} />
            </Panel>
          </PanelGroup>
        </div>
    );
}

export default DisplayFeeds;