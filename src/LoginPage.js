import React, { Component } from "react";
import { Image } from 'react-native';
import {
  Container,
  Thumbnail,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Form,
  Button,
  Text,
  Item,
  Input,
  Label
} from "native-base";
import Theme from './Theme';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <Container style={Theme.container}>
        <Content>
          <Image style={Theme.logo} source={require("./img/logo.png")} />
          <Form>
            <Item inlineLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}/>
            </Item>
            <Item inlineLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})} />
            </Item>
            <Button block onPress={() =>
              this.props.onLogin({
                username: this.state.username,
                password: this.state.password
              })
            }>
              <Text>Log in</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default LoginPage;
