import React from 'react';
import {Sidenav, Nav,Navbar,PanelGroup,Icon,Container,Sidebar,Header,Content,Divider,Panel} from 'rsuite';
import DisplayFeeds from './display-feeds';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Feed from './feed';
import LayoutTextFields from './create-feed';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../styles/home.css';
import { createMuiTheme } from '@material-ui/core/styles';
import FeedDashboard from './expansionPanel';
import Intro from './intro';
import axios from 'axios';



const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: "#004d40",
    backgroundColor: "#004d40"
  };
  
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  };

  const contentStyle = {
    padding: 10,
  }
  
  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  };
  
export default class HomePage extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  

  async componentDidMount() {
  /*   axios.get(`http://35.202.53.168/technical-blog/v1/getdashboard`)
      .then(res => {
        console.log("dash ",res.data)
      }) */ 
   
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }
  render() {
    const { expand } = this.state;
    return (
      <div className="show-fake-browser sidebar-page">
        <Container>
        <Router>
        <Container>
        
            <Header>
            <div className={"btn-place"}>
            <Button variant="contained" href='/' className={"button-blogger"}
              >
              BLOGGER
            </Button> </div>  
            
            </Header>
            
            <Divider />
            
            <Intro />
            <Content style={contentStyle}>
           
              <Switch>
                <Route path='/create' exact component={LayoutTextFields} />
              <Route path='/feed/:id' exact component={Feed}  />
              <Route path='/'  component={FeedDashboard}  />
             
              </Switch>
             
            </Content>
           
          </Container>
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={headerStyles} className={"nav-slider"}>
                <Icon icon="list" size="lg" style={{ verticalAlign: 0 }} />
                <span style={{ marginLeft: 12 }}> BRAND</span>
              </div>
            </Sidenav.Header>
            <Sidenav
              expanded={expand}
              defaultOpenKeys={['3']}
              appearance="subtle"
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                    HOME
                  </Nav.Item>
                  <Link to={'/create'}>
                  <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                   My Blogs
                  </Nav.Item>
                  </Link>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={this.handleToggle} />
          </Sidebar>

          </Router>
        </Container>
      </div>
    );
  }
}