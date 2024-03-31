import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { actions } from "../form/eventSlice";
import { useFireStore } from '../../../app/hooks/firestore/useFirestore';

export default function EventDashboard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFireStore('events');

  useEffect(() => {

    loadCollection(actions);
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
  }, [loadCollection]);

  if (status === 'loading') return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
}