import { useFonts } from 'expo-font';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/Store/store';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Josefin': require('./src/Assets/Fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
    
  });

  if (!fontsLoaded) {
    return null;
  }
  //Acá se manejará el estado para seleccionar una category y un producto

  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';

import Navigator from './src/Navigation/Navigator';
import store from './src/Store/store';
import { init } from './src/SQLite';
import { fonts } from './src/Assets/Fonts';


export default function App() {
  
  useEffect(()=> {
    init()
      .then((result)=> {
      })
      .catch(err => {
    })
  }, [])
  
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}
