import React , {Component} from 'react';
import {Text ,View, ScrollView, StyleSheet} from 'react-native';

export default class HomeScreen extends Component{
    render(props){
        function IconWithBadge({ name, badgeCount, color, size }) {
            return (
                <View style={{ width: 24, height: 24, margin: 5 }}>
                    <Icon name={name} size={size} color={color} />
                    {/* JSX에서 if문임 */}
                    {badgeCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                {badgeCount}
                            </Text>
                        </View>
                    )}
                </View>
            );
        }

        return(
            <IconWithBadge {...props} badgeCount={3} />
        );
    }
}

styles = StyleSheet.create({
    badge : {
        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

  

