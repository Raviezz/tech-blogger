import React from 'react';
import {Sidenav, Nav,Navbar,PanelGroup,Icon,Container,Sidebar,Header,Content,Divider,Panel} from 'rsuite';
import '../styles/home.css';
import DisplayFeeds from './display-feeds';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Feed from './feed';


const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    whiteSpace: 'nowrap',
    overflow: 'hidden',

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
        <Container>
            <Header>
              <h2>BLOGGER</h2>
            </Header>
            <Divider />
            
             
            <Content style={contentStyle}>
            <Router>
              <Switch>
              <Route path='/feed/:id' exact component={Feed}  />
              <Route path='/'  component={DisplayFeeds}  />
             
              </Switch>
              </Router>
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
                  <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                   My Blogs
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={this.handleToggle} />
          </Sidebar>

          
        </Container>
      </div>
    );
  }
}