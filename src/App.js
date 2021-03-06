import React, { Component } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import OpenviduReact from 'openvidu-hangouts-react';
import 'openvidu-hangouts-react/build/index.css';

  class App extends Component {

    constructor(props) {
      super(props);
      this.child = React.createRef();
      this.state = {
        valueSessionId: 'Session A',
        valueUserName: 'Participant' + Math.floor(Math.random() * 100),
        showLogin: true
      }

      this.onClick = this.onClick.bind(this);
      this.updateShowLogin = this.updateShowLogin.bind(this);
    }

    handleChangeSessionId(e){
      this.setState({
        valueSessionId : e.target.value,
      });
    }
  
    handleChangeUserName(e){
      this.setState({
        valueUserName : e.target.value,
      });
    }

    onClick(e) {
      this.child.current.joinSession();
      this.updateShowLogin(e);
    }

    updateShowLogin(e) {
      e.preventDefault();
      this.setState({
        showLogin: !this.state.showLogin
      })
    }

    render () {
      var valueSessionId = this.state.valueSessionId;
      var valueUserName = this.state.valueUserName;
      var valueShowLogin = this.state.showLogin;
      return (
        <div id= "main-container" className="container">
        { valueShowLogin === true ? 
        <div id="join">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                React Openvidu Hangouts 
              </Typography>
            </Toolbar>
          </AppBar>
          <div id="join-dialog" className="jumbotron vertical-center">
          <Card className="card">
              <Typography variant="display1" color="secondary" align="center">
                  Join a video session
              </Typography>
              <form className="form-group" onSubmit={this.handleSubmit}>
              <CardContent className="card-login">
                  <TextField className="form-control" type="text" label="Participant" id="userName" value={valueUserName} onChange={this.handleChangeUserName.bind(this)}required/>
                  <br />
                  <br />
                  <TextField className="form-control" type="text" label="Session" id="sessionId" inputRef={(input) => { this.sessionId = input; }} value={valueSessionId} onChange={this.handleChangeSessionId.bind(this)}required/>
              </CardContent>
              <CardActions className="button-login">
                <Button variant="raised" color="primary" id="join-button" name="commit" onClick={this.onClick}>
                  JOIN
                </Button>
              </CardActions>
          </form>    
          </Card>
          </div>
        </div> : null }
        <div id="videoCallContainer">
          <OpenviduReact updateLogin = {this.updateShowLogin} ref={this.child} wsUrl={"localhost"} sessionId={valueSessionId} participantId={valueUserName}/>
        </div>
        </div>
      );
    }
  }

export default App;
