import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Row from 'react-bootstrap/Row';
import '../styles/feed-display.css'
import {Link} from 'react-router-dom';

export default class FeedDisplayCard extends React.Component{
    constructor(props){
        super();
    }

    render(){
        return (
           <Box
           display="flex"
           justifyContent="space-between"
           padding="8"
           flexWrap="nowrap"
           >
                   <Typography variant="subtitle1" color="#38ef7d">
                    {this.props.feed}  sub title
                    </Typography>
                    <Link to={`/feed/${this.props.feed}`}>
                    <a className="view-more" >view</a>
                    </Link>
            </Box>
        );
    }
}