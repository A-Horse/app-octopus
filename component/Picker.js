import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Animated,
  Picker,
  Text,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import R from 'ramda';
import { PlaceholderColor, TextPrimaryColor } from '../constant';

const PICKER_HEIGHT = 257;

export default class OcPicker extends Component {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired
  };

  state = {
    value: this.props.value,
    pickerValue: this.props.value,
    modalVisible: false,
    pickerBottom: new Animated.Value(-PICKER_HEIGHT)
  };

  onChange(value) {
    this.props.onChange(value);
  }

  @autobind
  close() {
    Animated.timing(this.state.pickerBottom, {
      toValue: -PICKER_HEIGHT,
      duration: 150
    }).start();
    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 200);
  }

  @autobind
  open() {
    this.setState({ modalVisible: true });
    Animated.timing(this.state.pickerBottom, {
      toValue: 0,
      duration: 150
    }).start();
  }

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.container}>
            {/* TODO Check this feature */}
            <TouchableOpacity onPress={this.close}>
              <View style={styles.blankArea} />
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.pickerContainer,
                {
                  bottom: this.state.pickerBottom
                }
              ]}
            >
              <View style={styles.pickerActions}>
                <TouchableOpacity style={styles.pickerActionButton} onPress={() => this.close()}>
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerActionButton}
                  onPress={() => {
                    this.setState({ value: this.state.pickerValue });
                    this.onChange(this.state.pickerValue);
                    this.close();
                  }}
                >
                  <Text style={[styles.actionText, { color: '#4dce99' }]}>Confrim</Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={this.state.pickerValue}
                onValueChange={value => {
                  this.setState({ pickerValue: value });
                }}
                style={styles.repeatPicker}
              >
                {this.props.options.map(item => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </Animated.View>
          </View>
        </Modal>

        <TouchableOpacity onPress={this.open}>
          <Text
            style={[
              {
                color: !!this.state.value ? TextPrimaryColor : PlaceholderColor
              },
              this.props.style
            ]}
          >
            {R.compose(R.path(['label']), R.find(R.propEq('value', this.state.value)))(
              this.props.options
            ) || this.props.placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.7
  },
  blankArea: {
    opacity: 0,
    zIndex: 5,
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'green'
  },
  pickerContainer: {
    position: 'absolute',
    borderTopColor: '#e8e8e8',
    borderStyle: 'solid',
    borderTopWidth: 1,
    flex: 1,
    left: 0,
    width: '100%',
    height: PICKER_HEIGHT,
    zIndex: 10,
    backgroundColor: '#000'
  },
  pickerActions: {
    height: 40,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderBottomColor: '#e8e8e8',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    backgroundColor: '#fff'
  },
  pickerActionButton: {
    width: 98,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionText: {
    fontSize: 16,
    fontWeight: '400'
  },
  repeatPicker: {
    backgroundColor: '#fff'
  }
});
