import React, {Component} from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Content,
  Card,
  CardItem,
  Text,
  Item,
  Label,
  Input,
  Spinner
} from 'native-base';
import Theme from './Theme';
import API from './API.js';

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    API.getConsumptions([this.props.user.ID])
    .then(response => response.json())
    .then(result => {
      const user = result.meter[0];
      const hasEmptyInfo = result.meter.length === 0;
      this.setState({
        user: user,
        loading: false,
        error: hasEmptyInfo
      });
    })
    .catch(() => {
      this.setState({
        user: undefined,
        loading: false,
        error: true
      });
    })
  }

  renderServiceStatus(user){
    if (!user.serviceAvailable) {
      return(
        <Content>
          <Item success>
            <Input value='ACTIVE' disabled/>
            <Icon name='checkmark-circle' />
          </Item>
        </Content>
      );
    }
    return (
      <Content>
        <Item error>
          <Input  value='SUSPENDED' disabled/>
          <Icon name='close-circle' />
        </Item>
      </Content>
    );
  }

  renderUserInfo = () => {
    return (
      <Card>
        <CardItem header bordered>
          <Text>MAC {this.props.user.ID} </Text>
        </CardItem>
        <CardItem>
          <Content>
            <Item >
              <Label>Active Power [Wh]</Label>
              <Input
                value={`${parseFloat(this.state.user.activePower).toFixed(2)}`}
                disabled
              />
            </Item>
            <Item >
              <Label>Reactive Power [VArh]</Label>
              <Input
                value={`${parseFloat(this.state.user.reactivePower).toFixed(2)}`}
                disabled
              />
            </Item>
            <Item >
              <Label>Apparent Power [VAh]</Label>
              <Input 
                value={`${parseFloat(this.state.user.aparentPower).toFixed(2)}`}
                disabled
              />
            </Item>
            <Item >
              <Label>Power Factor</Label>
              <Input 
                value={`${parseFloat(this.state.user.powerFactor).toFixed(4)}`}
                disabled
              />
            </Item>
          </Content>        
        </CardItem>
        <CardItem>
          {this.renderServiceStatus(this.props.user)}
        </CardItem>
      </Card>
    );
  }

  renderError() {
    return (
      <Card transparent>
        <CardItem>
          <Body>
            <Text style={{color: 'red'}}>
              Error occured while getting server information.
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <Container>
        <Header style={Theme.header}>
          <Body>
            <Title>{this.props.user.username}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.onLogout()}>
              <Icon name='log-out' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          {this.state.loading && !this.state.error && <Spinner color='blue' />}
          {this.state.user && this.renderUserInfo()}
          {!this.state.loading && this.state.error && this.renderError()}
        </Content>
      </Container>
    );
  }
}

export default UserPage;
