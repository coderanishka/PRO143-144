import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { Header, Icon, ListItem } from "react-native-elements";
import axios from "axios";

export default class PopularArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleDetails: []
        }
    }

    componentDidMount() {
        this.getPopular()
    }

    getPopular = () => {
        const url = 'http://3a9b-2402-e280-3d6b-7e-3138-6a54-92e9-ff24.ngrok.io/popular-articles'
        axios
        .get(url)
    
        .then(response => {
            let details = response.data.data;
            this.setState({
                articleDetails: details
            })
        })
    }

    renderItem = ({item, index}) => (
        <ListItem
        key = {index}
        bottomDivider
        title = {`Article Name : ${item.title.toUpperCase()}`}
        titleStyle = {{color: '#F24C00', fontSize : 18, fontWeight: "bold"}}
        subtitle = {`Date Published : ${moment.unix(item.timestamp).format("DD/MM/YYYY")}`}
        subtitleStyle = {{color: '#FC7A1E', fontSize: 16}}
        chevron = {{color: '#F9C784', size: 25}}
        onPress = {() => {
            this.props.navigation.navigate("ViewArticle", {
                article_name: item.title.toUpperCase(),
                url: item.url,
                id: item.id
            })
        }}
        containerStyle = {{backgroundColor: '#E7E7E7'}}
        >
        </ListItem>
    )

    keyExtractor = (item, index) => index.toString();

    render() {
        const { articleDetails } = this.state;

        return(
            <View style = {{backgroundColor: '#E7E7E7'}}>
            <Header
            centerComponent={{ text: 'Popular Articles', style: { color: '#fff', fontSize: 28, fontWeight: "bold" } }}
            backgroundColor = "#485696"/>
            <FlatList
                keyExtractor = {this.keyExtractor}
                data = {articleDetails}
                renderItem = {this.renderItem}
                maxToRenderPerBatch = {10}/>
            </View>
        )
    }
}