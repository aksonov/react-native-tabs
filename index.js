'use strict';

var React = require('react-native');
var {
    Component,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} = React;

class Tabs extends Component {
    onSelect(el){
        if (el.props.onSelect) {
            el.props.onSelect(el);
        }
        if (this.props.onSelect) {
            this.props.onSelect(el);
        }
    }

    render(){
        var self = this;
        return (
            <View style={[styles.tabbarView, this.props.style]}>
                {this.props.children.map((el)=>
                    <TouchableOpacity key={el.props.name+"touch"} 
                       style={[styles.iconView, this.props.iconStyle, el.props.name == this.props.selected ? this.props.selectedIconStyle || el.props.selectedIconStyle || {} : {} ]}
                       onPress={()=>!self.props.locked && self.onSelect(el)}
                       onLongPress={()=>self.props.locked && self.onSelect(el)}>
                         {self.props.selected == el.props.name ? React.cloneElement(el, {style: {...el.props.style, ...this.props.selectedStyle, ...el.props.selectedStyle}}) : el}
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
    }
});

module.exports = Tabs;
