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
    constructor(props){
        super(props);
        this.state = {};
        this.children = {};
    }
    onSelect(el){
        var func = el.props.onSelect || this.props.onSelect;
        var props = {};
        if (func){
            props = func(el)
        }
        props = Object.assign(props, el.props);
        props.selected = true;
        this.setState({selected: el.props.name, props});
    }

    componentDidMount(){
        var selected = null;
        var first = null;
        React.Children.forEach(this.props.children, (el, index)=> {
            this.children[el.props.name] = Object.assign({}, el.props);
            this.children[el.props.name].key = el.props.name
            if (this.props.selected == el.props.name) {
                selected = el;
            }
            if (index===0){
                first = el;
            }

        });
        if (selected){
            this.onSelect(selected);
        } else {
            // mark first as selected
            var props = Object.assign({}, first.props, {selected: true});
            this.setState({selected : first.props.name, props});
        }
    }
    render(){
        var self = this;
        return (
            <View style={[styles.tabbarView, this.props.style]}>
                {this.props.children.map((el)=>
                    <TouchableOpacity key={el.props.name+"touch"} 
                       style={[styles.iconView, this.props.iconStyle]} 
                       onPress={()=>!self.props.locked && self.onSelect(el)} 
                       onLongPress={()=>self.props.locked && self.onSelect(el)}>
                         {!self.props.selected && (self.state.selected == el.props.name) ? React.cloneElement(el, self.state.props) : el}
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
