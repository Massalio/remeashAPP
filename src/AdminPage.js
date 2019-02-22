import React, {Component} from 'react';
import {Themeheet} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Right,
  Left,
  Icon,
  CardItem,
  Card,
  Form,
  Item,
  Label,
  Input,
  Toast
} from 'native-base';
import Theme from './Theme';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      selectedMeter: undefined,
      newUsername: '',
      newPassword: ''
    };
  }

  onEdit = (meter) => {
    this.setState({
      isEditing: true,
      selectedMeter: meter,
      newUsername: meter.username,
      newPassword: meter.password
    });
  }

  resetState = () => {
    this.setState({
      isEditing: false,
      selectedMeter: undefined,
      newUsername: '',
      newPassword: ''
    });
  }

  onCancelEdit = () => {
    this.resetState();
  }

  onConfirmEdit = () => {
    if (!this.state.newUsername) {
      Toast.show({
        text: "Error: username is mandatory",
        duration: 3000,
        type: "danger"
      });
    } else if (!this.state.newPassword) {
      Toast.show({
        text: "Error: password is mandatory",
        duration: 3000,
        type: "danger"
      });
    } else {
      const newMeter = { 
        ID: this.state.selectedMeter.ID,
        role: this.state.selectedMeter.role,
        serviceAvailable: this.state.selectedMeter.serviceAvailable,
        username: this.state.newUsername,
        password: this.state.newPassword   
      };
      this.props.onEditMeter(newMeter);
      Toast.show({
        text: "Meter successfully edited",
        duration: 3000,
        type: "success"
      });
      this.resetState();
    }
  }

  renderDescription = (username) => {
    if (username)
      return (<Text note numberOfLines={1}>assigned to user {username}</Text>)
    return (<Text note numberOfLines={1}>(not assigned)</Text>)
  }

  renderRow = (meter) => {
    return (
      <ListItem selected={!!meter.username}>
        <Body>
          <Text>MAC {meter.ID} </Text>
          {this.renderDescription(meter.username)}
        </Body>
        <Right>
          <Button onPress={() => this.onEdit(meter) }>
            <Text>Edit</Text>
          </Button>
        </Right>
      </ListItem>
    )
  }

  renderInfoPage = () => {
    return (
      <Container>
        <Header style={Theme.header}>
          <Body>
            <Title>Mesh Network</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.onLogout()}>
              <Icon name='log-out' />
            </Button>
          </Right>
        </Header>
        <Content>
          <List dataArray={this.props.meters}
            renderRow={this.renderRow}>
          </List>
        </Content>
      </Container>
    )
  }

  renderEditPage = () => {
    return (
      <Container>
        <Header style={Theme.header}>
          <Left>
            <Button transparent onPress={() => this.onCancelEdit()}>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Editing Meter</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.onConfirmEdit()}>
              <Icon name='md-checkmark-circle-outline' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>MAC {this.state.selectedMeter.ID}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Content>
                  <Form>
                    <Item stackedLabel>
                      <Label>Assign to {this.state.selectedMeter.username && `(old value: ${this.state.selectedMeter.username})`} </Label>
                      <Input value={this.state.newUsername} onChangeText={(username) => this.setState({newUsername: username})}/>
                    </Item>
                    <Item stackedLabel>
                      <Label>Password {this.state.selectedMeter.password && `(old value: ${this.state.selectedMeter.password})`} </Label>
                      <Input value={this.state.newPassword} secureTextEntry={true} onChangeText={(password) => this.setState({newPassword: password})} />
                    </Item>
                  </Form>
                </Content>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }

  render() {
    if (!this.state.isEditing) 
      return this.renderInfoPage();
    return this.renderEditPage();
  }
}

export default AdminPage;
