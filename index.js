'use strict';

var React = require('react-native');
var {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} = React;

function getComponentChildrenType(el) {
  const children = el.props.children
  const type = typeof children
  if (type === 'string') {
    return 'string'
  } else if (type === 'object') {
    if(Object.prototype.toString.call(children) === '[object Array]') {
      return 'array'
    }else {
      return 'object'
    }
  } else {
    return 'undefined'
  }
}

function recursivelyStyled(el, style) {
  const type = getComponentChildrenType(el)
  if(type === 'string' || type === 'undefined') {
    return React.cloneElement(el, {style})
  }else if (type === 'object') {
    return React.cloneElement(el, {children: recursivelyStyled(el.props.children, style), style})
  }else if (type === 'array') {
    return React.cloneElement(el, {children: React.Children.map(el.props.children, (el) => {
      return recursivelyStyled(el, style)
    })})
  }else {
    console.error('This element is unknown', el);
  }
}

class Tabs extends Component {
    styled(el) {
      const style = Object.assign({}, el.props.style, this.props.selectedStyle, el.props.selectedStyle)
      return recursivelyStyled(el, style)
    }

    onSelect(el){
        if (el.props.onSelect) {
            el.props.onSelect(el);
        } else if (this.props.onSelect) {
            this.props.onSelect(el);
        }
    }

    render(){
        const self = this;
        let selected = this.props.selected
        if (!selected){
            React.Children.forEach(this.props.children, el=>{
                if (!selected || el.props.initial){
                    selected = el.props.name;
                }
            });
        }

        return (
            <View style={[styles.tabbarView, this.props.style]}>
                {React.Children.map(this.props.children,(el, idx)=>
                    <TouchableOpacity key={el.props.name+"touch"}
                       style={[styles.iconView, this.props.iconStyle, el.props.name == selected ? this.props.selectedIconStyle || el.props.selectedIconStyle || {} : {} ]}
                       onPress={()=>!self.props.locked && self.onSelect(el)}
                       onLongPress={()=>self.props.locked && self.onSelect(el)}>
                       {selected == el.props.name ? this.styled(el) : el}
                       {this.props.separator && idx !== 0 ? <View style={styles.separator}></View> : null}
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabbarView: {
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        height:50,
        opacity:1,
        backgroundColor:'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconView: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentView: {
        flex: 1
    },
    separator: {
        width: 1,
        height: 50,
        backgroundColor: '#ccc',
        position: 'absolute',
        left: 0,
        top: 0,
    },
});

module.exports = Tabs;
