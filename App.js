import { Platform, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppProvider from './Components/context';
import { MUD_GREENISH_COLOR } from './res/colors';
import Navigation from './src/navigation';
import { RootSiblingParent } from 'react-native-root-siblings';



export default function App() {

  return (
    <AppProvider>
      <PaperProvider>
        {Platform.OS === 'android' &&
          <StatusBar backgroundColor={MUD_GREENISH_COLOR} />
        }
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </PaperProvider>
    </AppProvider>
  );
}