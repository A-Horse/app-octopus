//      
import React from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'expo';

export class Input extends React.Component  
                      
             
                       
               
                   
   {
  render() {
    return (
      <View style={[{ borderWidth: 1, borderRadius: 6, borderColor: '#e8e8e8', height: 50 }, this.props.style]}>
        {this.props.icon && (
          <Icon.FontAwesome
            name={this.props.icon}
            size={18}
            style={{ marginBottom: -3, position: 'absolute', top: 14.5, left: 13 }}
            color={this.props.iconColor || '#999'}
          />
        )}

        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            height: '100%',
            width: '100%',
            padding: 10,
            paddingLeft: this.props.icon ? 43 : 10
          }}
          selectionColor={'#999'}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          spellCheck={false}
          secureTextEntry={this.props.textContentType === 'password'}
          placeholder={this.props.placeholder}
          onChangeText={value => this.props.onChange(value)}
          textContentType={this.props.textContentType || 'none'}
        />
      </View>
    );
  }
}
