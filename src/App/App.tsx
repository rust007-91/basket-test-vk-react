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
import getCards from '../util/cardApi';
import { useEffect, useState } from 'react';

const App = () => {
  const platform = usePlatform();
  const [isCards, setIsCards] = useState([]);

  useEffect(() => {
    getCards()
      .then((data) => {
        setIsCards(data);

      })
      .catch((err) => alert(err));
  }, []);

  const cardDelete = (card) => {
    // ищем сохранённую карту с id и записываем новый массив
    setIsCards((state) => state.filter((item) => item.id !== card.id));
  }



  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none"/>}>
        <SplitCol autoSpaced>
          <View activePanel="card">
            <Panel id="card">
              <PanelHeader>
                <Icon28LogoVkColor />
              </PanelHeader>
              <Group>
                <Group mode="plain">
                  <CardGrid size="l">
                    {
                      isCards.map((card) => {
                        return(
                          <Card
                            key={card.id}
                            card={card}
                            category={card.category}
                            image={card.image}
                            title={card.title}
                            price={card.price}
                            onDelete={cardDelete}
                          />
                        )
                      })
                    }

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
