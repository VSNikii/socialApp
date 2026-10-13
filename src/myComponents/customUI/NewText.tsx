import {Text, TextProps, StyleSheet} from 'react-native';

export default function MyText(props: TextProps){
    return(
        <Text {...props} style={styles.defaultText} />
    )
}

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: "Inter",
        fontSize: 13,
        color: '#0F172A',
    }
})