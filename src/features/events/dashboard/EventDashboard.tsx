import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";
import { useEffect, useRef, useState } from "react";
import { actions } from "../form/eventSlice";
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';
import EventFilters from "./EventFilters";
import { QueryOptions } from '../../../app/hooks/firestore/types';
import EventListItemPlaceholder from "./EventListPlaceholder";

export default function EventDashboard() {
  const contextRef = useRef(null);
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore('events');
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'date', operator: '>=', value: new Date() }
  ]);

  useEffect(() => {

    loadCollection(actions, {
      queries: query
    });
    // const q = query(collection(db, 'events'));
    // const unsubscribe = onSnapshot(q, {
    //   next: querySnapshot => {
    //     const evts: AppEvent[] = [];
    //     querySnapshot.forEach(doc => {
    //       evts.push({ id: doc.id, ...doc.data() } as AppEvent);
    //     });
    //     dispatch(actions.success(evts));
    //     setLoading(false);
    //   },
    //   error: err => {
    //     console.log(err);
    //     setLoading(false);
    //   },
    //   complete: () => console.log('never will see this!')
    // });
    // return () => unsubscribe();
    // 
  }, [loadCollection, query]);

  return (
    <Grid>
      <Grid.Column width={10} ref={contextRef}>
        {status === 'loading' ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <div className='ui fixed top sticky' style={{ top: 98, width: 405 }}>
          <EventFilters setQuery={setQuery} />
        </div>
      </Grid.Column>
    </Grid>
  );
}