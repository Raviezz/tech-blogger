import React ,{useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import { Centered } from './common-components/intro-util';
import {Link} from 'react-router-dom';
import '../styles/feed-display.css'
import Box from '@material-ui/core/Box';
import dashboard from '../resources/dashboard.json';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:350,
  },
  title: {
    fontSize: 20,
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12,
  },
  secondaryHeading: {
    paddingLeft: 10,
    paddingRight:10,
    alignContent: 'center',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  cardStyle:{
      paddingLeft:10
  },
  spinner: {
      margin:10,
      alignContent:"center"
  }
}));
const image = "hhttps://www.saraswatiias.com/wp-content/uploads/2018/11/dummy-profile-pic-male1.jpg";
export default class FeedDashboard extends React.Component {
  
    constructor() {
        super();
        this.state={
            expanded: false,
            dashboardData: []
        }
    }
    async getData() {
        const restCall = await axios.get(`http://35.202.53.168/technical-blog/v1/getdashboard`);
        return  restCall;
    }
    async componentDidMount() {
         const fetchData = await this.getData()
         this.setState({dashboardData:dashboard})
    }
   
   handleChange = (panel) => (event, isExpanded) => {
    this.setState({expanded:isExpanded ? panel : false});
  };

  render() {
  return (
    <div className={useStyles.root}>
        {this.state.dashboardData.map((feed)=>{
            return (
                <Card className={useStyles.cardStyle}>
                <CardContent>
                    <Box
                    display='flex'
                    justifyContent='space-between'
                    >
                    <Typography className={useStyles.title} variant="h5" component="h2">
                   {feed.feed_data_json.feed_title}
                    </Typography>
                    <Typography className={useStyles.title} variant="h5" color="textSecondary">
                    {feed.feed_category_data.feed_category_name}
                    </Typography>
                    </Box>
                    <Box
                    display='flex'
                    paddingRight="10"
                    >
                        {feed.feed_data_json.feed_meta_tags.map((tag)=>{
                            return (
<                       Typography className={useStyles.pos} color="textSecondary">
                        {tag}
                    </Typography>
                            );
                        })}
                    </Box>
                    
                    <Typography variant="body2" component="p">
                        {feed.feed_data_json.feed_body}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" href={`/feed/${feed.feed_id}`}>Read More</Button>
                </CardActions>
                </Card>
            );
        })}
       {/*  <div className={useStyles.spinner}>
            <CircularProgress alignContent="center"/>
            </div>*/}
        </div> 
    );
    }
}
