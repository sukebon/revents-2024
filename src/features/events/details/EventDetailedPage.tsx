import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { useEffect } from "react";
import { actions } from "../form/eventSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
// import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "../../../app/config/firebase";
// import { toast } from "react-toastify";

export default function EventDetailedPage() {
  const { id } = useParams();
  const event = useAppSelector(state =>
    state.events.data.find(event => event.id === id));
  const { status } = useAppSelector(state => state.events);
  const { loadDocument } = useFireStore('events');
  // const [loading, setLoading] = useState(true);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
    // const unsubscribe = onSnapshot(doc(db, 'events', id), {
    //   next: doc => {
    //     dispatch(actions.success({ id: doc.id, ...doc.data() } as any));
    //     setLoading(false);
    //   },
    //   error: err => {
    //     console.log(err);
    //     toast.error(err.message);
    //     setLoading(false);
    //   },
    // });
    // return () => unsubscribe();
  }, [id, loadDocument]);

  if (status === 'loading') return <LoadingComponent />;
  if (!event) return <h2>Event not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
}