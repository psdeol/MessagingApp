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
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
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
