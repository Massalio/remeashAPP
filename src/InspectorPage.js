import React, {Component} from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Content,
  ListItem,
  Text,
  Switch,
  Card,
  CardItem
} from 'native-base';
import Theme from './Theme';

class InspectorPage extends Component {
  constructor(props) {
    super(props)
  }

  onEditUser = (user) => {
    const newUser = { 
      ID: user.ID,
      role: user.role,
      serviceAvailable: !user.serviceAvailable,
      username: user.newUsername,
      password: user.newPassword   
    };
    this.props.onEditUser(newUser);
  }

  renderRow = ({item: user}) => {
    return (
      <ListItem key={user.ID} selected={user.serviceAvailable}>
        <Body>
          <Text>MAC {user.ID} </Text>
          <Text note numberOfLines={1}>assigned to user {user.username}</Text>
          <Text note numberOfLines={1}>service status: {user.serviceAvailable ? 'INACTIVE' : 'ACTIVE'}</Text>
        </Body>
        <Right>
          <Switch onValueChange={() => this.onEditUser(user) } value={!user.serviceAvailable} />
        </Right>
      </ListItem>
    );
  }

  renderEmpty() {
    return (
      <Card transparent>
        <CardItem>
          <Body>
            <Text>
              No users found.
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
            <Title>Consumers control</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.onLogout()}>
              <Icon name='log-out' />
            </Button>
          </Right>
        </Header>
        <Content>
          <FlatList 
            data={this.props.users}
            renderItem={this.renderRow}
            keyExtractor={user => user.ID}
          />
          {this.props.users.length === 0 && this.renderEmpty()}
        </Content>
      </Container>
    );
  }
}

export default InspectorPage;
