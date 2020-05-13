import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Avatar,
  Menu,
  Dropdown
} from 'antd';
import {
  Link,
} from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

import {
  fetchUser
} from "store/thunks/userThunks";

const { SubMenu } = Menu;

class AvatarDropdown extends React.Component {
  componentWillMount() {
    const {
      fetchUser,
    } = this.props;

    fetchUser();
  }

  render() {
    console.log(this.props);
    const userMenu = (
      <Menu>
        <Menu.Item style={{ fontSize: 20, margin: 10 }}>
          <Link to="/settings">
            <SettingOutlined /> Settings
          </Link>
        </Menu.Item>
        <Menu.Item style={{ fontSize: 20, margin: 10 }}>
          <Link to="signout">
            <LogoutOutlined /> Signout
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div style={{ float: 'right' }}>
        <Link to="/settings">
          <Dropdown overlay={userMenu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (event, data) => dispatch(fetchUser(event))
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarDropdown);
