import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { BarWrapper, BAR_POSITIONS } from './BarWrapper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const BUTTON_WIDTH = 40;

export default class BottomBar extends React.Component {

  static propTypes = {
    displayed: PropTypes.bool,
    height: PropTypes.number,
    caption: PropTypes.string,
    displayNavArrows: PropTypes.bool,
    displayGridButton: PropTypes.bool,
    displayActionButton: PropTypes.bool,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onGrid: PropTypes.func,
    onAction: PropTypes.func,
  };

  static defaultProps = {
    displayed: false,
    caption: '',
    displayNavArrows: false,
    displayGridButton: false,
    displayActionButton: false,
    onPrev: () => {},
    onNext: () => {},
    onGrid: () => {},
    onAction: () => {},
  };

  _renderNavArrows() {
    const {
      displayNavArrows,
      displayGridButton,
      displayActionButton,
      onPrev,
      onNext,
    } = this.props;
    const missingButtonMargin = BUTTON_WIDTH;
    const arrows = [];

    if (displayNavArrows) {
      // make sure arrows are always at the center of the bar
      // if grid or action buttons are missing
      // note: making grid and action button positions absolute is a nicer way
      // but it's breaking TouchableHiglight for some reason
      // FIX_ME: when you find out a nicer way

      const leftArrow = (
        <TouchableOpacity
          key="left_arrow"
          style={styles.button}
          onPress={onPrev}
        >
          <Image
            source={{uri: 'ic_action_image_navigate_back', isStatic: true}}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      );
      const rightArrow = (
        <TouchableOpacity
          key="right_arrow"
          style={styles.button}
          onPress={onNext}
        >
          <Image
            source={{uri: 'ic_action_image_navigate_next', isStatic: true}}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      );

      arrows.push(leftArrow, rightArrow);
    }
    return (
      <View style={[styles.arrowContainer, {
        marginRight: displayGridButton ? missingButtonMargin : 0,
        marginLeft: displayActionButton ? missingButtonMargin : 0,
      }]}>
      {arrows}
    </View>
    );
  }

  _renderGridButton() {
    const { displayGridButton, onGrid } = this.props;

    if (displayGridButton) {
      return (
        <TouchableOpacity style={[styles.button, { flex: 0 }]} onPress={onGrid}>
          <Image
            source={{uri: 'ic_action_dashboard_selected', isStatic: true}}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  _renderActionSheet() {
    const { displayActionButton, onAction } = this.props;

    if (displayActionButton) {
      return (
        <View style={styles.rightContainer}>
          <Menu>
            <MenuTrigger>
              <Image source={{uri: 'ic_action_overflow_menu', isStatic: true}} style={styles.buttonImage}/>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => {
                  try {
                    this.props.media.mediaActions.downloadNow(this.props.media)
                  }catch(err) {

                  }
                }}>
                <Text style={styles.menuOption}>Download and Open</Text>
              </MenuOption>
              <MenuOption onSelect={() => {
                  try {
                    this.props.media.mediaActions.deleteNow(this.props.media)
                  }catch(_err) {

                  }
                }}>
                <Text style={styles.menuOption}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      );
    }
    return null;
  }


  render() {
    const { displayed, caption, height } = this.props;


    return (
      <BarWrapper
        position={BAR_POSITIONS.BOTTOM}
        displayed={displayed}
        height={height}
        style={styles.container}
      >
        <View style={styles.barContainer}>
          <View style={styles.captionContainer}>
            <Text style={styles.caption} numberOfLines={1}>{caption}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {this._renderGridButton()}
            {this._renderNavArrows()}
            {this._renderActionSheet()}
          </View>
        </View>

      </BarWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
    alignItems: 'center',
    // justifyContent:'center',
    // padding: 5
  },
  barContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    // backgroundColor: 'orange',
    flex: 1,
    paddingTop: 10
  },
  captionContainer: {
    // flex: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  caption: {
    color: 'black',
    alignSelf: 'center',
  },
  arrowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start'
  },
  leftContainer: {
    position: 'absolute',
    left: 0
  },
  rightContainer: {
    // position: 'absolute',
    // right: 0
  },
  button: {
    // alignItems: 'center',
    // width: BUTTON_WIDTH,
  },
  buttonImage: {
    width: 56,
    height: 56
  },
  menuOption: {
    padding: 5,
    margin: 5,
    fontSize: 16
  }
});
