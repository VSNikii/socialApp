import { useState } from 'react';
import { View } from 'react-native';
import Login from './auth/Login';
import Registration from './auth/Registration';


export default function Index() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {isAuth ? <Login/> : <Registration/>}  
      {/* <Feed /> */}
    </View>
  );
}