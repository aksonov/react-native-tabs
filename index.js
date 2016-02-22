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

    getSelectedElement(props, selected){
        let result = null;
        React.Children.forEach(props.children, el => {
            if (selected == el.props.name || result == null) {
                result = el;
            }
        });
        return result;
    }


    constructor(props){
        super(props);
        this.state = {selected : props.selected};
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount(){
        this.onSelect(this.getSelectedElement(this.props, this.props.selected));
    }

    componentDidUpdate({selected}){
        // change selected state if selected is new value
        if (selected && selected != this.props.selected && selected != this.state.selected){
            this.onSelect(this.getSelectedElement(this.props, selected));
        }
    }

    onSelect(el){
        if (el.props.onSelect){
            if (el.props.onSelect(el)===false){
                return;
            }
        }
        if (this.props.onSelect){
            if (this.props.onSelect(el)===false){
                return;
            }
        }
        if (this.state.selected != el.props.name){
            this.setState({selected: el.props.name});
        }
    }

    render(){
        var self = this;
        return (
            <View style={[styles.tabbarView, this.props.style]}>
                {this.props.children.map((el)=>
                    <TouchableOpacity key={el.props.name+"touch"} 
                       style={[styles.iconView, this.props.iconStyle, el.props.name == this.state.selected ? this.props.selectedIconStyle || el.props.selectedIconStyle || {} : {} ]}
                       onPress={()=>!self.props.locked && self.onSelect(el)}
                       onLongPress={()=>self.props.locked && self.onSelect(el)}>
                         {self.state.selected == el.props.name ? React.cloneElement(el, {style: {...el.props.style, ...this.props.selectedStyle, ...el.props.selectedStyle}}) : el}
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
