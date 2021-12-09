import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import MainNavigator from './MainNavigation';
import AuthNavigator from './AuthNavigation';
import LoadingScreen from '../screens/LoadingScreen';

export default function Navigation({ app }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        onAuthStateChanged(getAuth(app), (user) => {
            if (mounted) {
                setUser(user);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
        }
    }, []);

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <NavigationContainer>
            { user ? <MainNavigator app={app} /> : <AuthNavigator app={app} />}
        </NavigationContainer>
    );
}
