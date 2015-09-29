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
        this.setState(this.children);
        var func = el.props.onSelect || this.props.onSelect;
        var props = {};
        if (func){
            props = func(el)
        }
        props = Object.assign(props, el.props);
        props.selected = true;
        console.log(JSON.stringify(props));
        var map={};
        map[el.props.name] = props;
        map.key = el.props.name;
        this.setState(map);
    }

    componentDidMount(){
        var selected = null;
        React.Children.forEach(this.props.children, (el)=> {
                this.children[el.props.name] = Object.assign({}, el.props);
                this.children[el.props.name].key = el.props.name
                if (this.props.selected == el.props.name) {
                    selected = el;
                }
            }
        )
        this.setState(this.children);
        if (selected){
            this.onSelect(selected);
        }
    }
    render(){
        var self = this;
        return (
            <View style={[styles.tabbarView, this.props.style]}>
                {this.props.children.map((el)=>
                    <TouchableOpacity style={styles.iconView} onPress={()=>self.onSelect(el)}>
                        {React.addons.cloneWithProps(el, self.state[el.props.name])}
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
        alignItems: 'center',
    },
    contentView: {
        flex: 1
    }
});

module.exports = Tabs;
