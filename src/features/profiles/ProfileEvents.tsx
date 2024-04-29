import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardGroup, CardHeader, CardMeta, Grid, GridColumn, Header, Image, Tab, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "../events/form/eventSlice";

type Props = {
  profile: Profile;
};

export default function ProfileEvents({ profile }: Props) {
  const { loadCollection } = useFireStore('events');
  const { data: events, status } = useAppSelector(state => state.events);

  const panes = [
    { menuItem: 'Future events', pane: { key: 'future' } },
    { menuItem: 'Past events', pane: { key: 'post' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ];

  const initialOptions: CollectionOptions = {
    queries: [
      { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
      { attribute: 'date', operator: '>=', value: new Date() }
    ],
    sort: { attribute: 'date', order: 'asc' },
    reset: true
  };

  const [options, setOptions] = useState<CollectionOptions>(initialOptions);

  function handleSetQuery(tab: number) {
    const options: CollectionOptions = {} as CollectionOptions;
    switch (tab) {
      case 1:
        options.queries = [
          { attribute: 'attendeeIds', operator: 'array-contains', value: profile.id },
          { attribute: 'date', operator: '<', value: new Date() }
        ],
          options.sort = { attribute: 'date', order: 'desc' };
        options.reset = true;
        break;
      case 2:
        options.queries = [
          { attribute: 'hostUid', operator: '==', value: profile.id },
        ], options.sort = { attribute: 'date', order: 'asc' };
        options.reset = true;
        break;
      default:
        options;
        options.reset = true;
        break;
    }
    setOptions(options);
  }

  useEffect(() => {
    loadCollection(actions, options);
  }, [loadCollection, options]);


  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon='calendar' content='events' />
        </GridColumn>
        <GridColumn width={16}>
          <Tab
            onTabChange={(_e, data) => handleSetQuery(data.activeIndex as number)}
            panes={panes}
            name={{ secondary: true, pointing: true }}
          />
          <CardGroup itemsPerRow={4} style={{ marginTop: 10 }}>
            {events.map(event => (
              <Card
                key={event.id}
                as={Link}
                to={`/events/${event.id}`}
              >
                <Image
                  src={`/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <CardContent>
                  <CardHeader content={event.title} textAlign="center" />
                  <CardMeta textAlign="center">
                    <span>{event.date}</span>
                  </CardMeta>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}