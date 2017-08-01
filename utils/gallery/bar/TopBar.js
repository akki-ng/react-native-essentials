import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { BarWrapper } from './BarWrapper';

export default class TopBar extends React.Component {

  static propTypes = {
    displayed: PropTypes.bool,
    title: PropTypes.string,
    height: PropTypes.number,
    backTitle: PropTypes.string,
    backImage: PropTypes.any,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    displayed: false,
    title: '',
    backTitle: 'Back',
    backImage: {uri: 'ic_action_navigation_arrow_back', isStatic: true},
  };

  renderBackButton() {
    const { onBack, backImage } = this.props;

    // do not display back button if there isn't a press handler
    if (onBack) {
      return (
        <TouchableOpacity style={styles.backContainer} onPress={onBack}>
          <Image source={backImage} style={styles.backImage}/>
          {Platform.OS === 'ios' &&
            <Text style={[styles.text, styles.backText]}>
              {this.props.backTitle}
            </Text>}
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const {
      displayed,
      customTitle,
    } = this.props;
    var height = (Platform.OS === 'ios') ? 20 : 70
    return (
      <BarWrapper
        style={styles.container}
        displayed={displayed}
        height={height}
      >
        {this.renderBackButton()}
        <Text style={styles.text}>{customTitle}</Text>

      </BarWrapper>
    );

    /*
    <View style={styles.rightContainer}>
          <Menu>
            <MenuTrigger>
              <Image source={{uri: 'ic_action_overflow_menu', isStatic: true}} style={styles.backImage}/>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => {
                try {
                  this.props.deleteAllSelected()
                }catch(_err) {

                }
              }} text='Delete' />
            </MenuOptions>
          </Menu>
        </View>
     */
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
    alignItems: 'center',
    // paddingTop: 30,
    // padding: 5
  },
  text: {
    fontSize: 18,
    color: 'black',
    // position: 'absolute',
    // bottom: 7,
    flex: 1,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#cacaca',
  },
  backContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    // left: 0,
    // bottom: 0
  },
  rightContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    // right: 0,
    // bottom: 0,
  },
  backText: {
    // paddingTop: 14,
    // position: 'relative',
    // marginLeft: 0,
    // bottom: 0,
    // alignSelf: 'center'
    // right: 0
  },
  backImage: {
    width: 56,
    height: 56,
  }
});
