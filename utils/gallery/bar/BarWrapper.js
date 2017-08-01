import React, { PropTypes, Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Platform
} from 'react-native';

const BAR_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

class BarWrapper extends Component {

  static propTypes = {
    style: View.propTypes.style,
    position: PropTypes.oneOf([BAR_POSITIONS.TOP, BAR_POSITIONS.BOTTOM]),
    displayed: PropTypes.bool,
    height: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    position: BAR_POSITIONS.TOP,
    displayed: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(1),
      height: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    Animated.timing(this.state.animation, {
      toValue: nextProps.displayed ? 1 : 0,
      duration: 300,
    }).start();
  }

  render() {
    const { style, position, children } = this.props;
    const isBottomBar = position === BAR_POSITIONS.BOTTOM;
    const {height} = this.state

    return (
      <Animated.View
        style={[
          styles.container,
          style,
          isBottomBar ? styles.bottomBar : styles.topBar,
          {
            // height,
            opacity: this.state.animation,
            transform: [{
              translateY: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [isBottomBar ? height : height * -1, 0],
              }),
            }],
          },
        ]}
      >
        <View style={style}
        onLayout={this.onLayout.bind(this)}>
          {children}
        </View>
      </Animated.View>
    );
  }

  onLayout({nativeEvent}) {
    if(nativeEvent && nativeEvent.layout) {
      // console.log(nativeEvent.layout)
      this.setState({height: nativeEvent.layout.height, heightUpdated: true})
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    backgroundColor: 'red',
  },
  topBar: {
    top: 0,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  bottomBar: {
    bottom: 0,
  },
});

export {
  BarWrapper,
  BAR_POSITIONS,
};
