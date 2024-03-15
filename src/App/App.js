import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  CardGrid, usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {Icon28LogoVkColor} from '@vkontakte/icons';
import Card from '../Card/Card';

const App = () => {
  const platform = usePlatform();

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="card">
            <Panel id="card">
              <PanelHeader>
                <Icon28LogoVkColor />
              </PanelHeader>
              <Group>
                <Group mode="plain">
                  <CardGrid size="l">
                    <Card />
                  </CardGrid>
                </Group>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

export default App;
