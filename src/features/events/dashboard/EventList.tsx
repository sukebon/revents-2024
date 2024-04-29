import EventListItem from "./EventListItem";
import { type AppEvent } from "../../../app/types/events";
import InfiniteScroll from "react-infinite-scroller";

interface EventListProps {
  events: AppEvent[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

export default function EventList({ events, hasMore, loadMore, loading }: EventListProps) {

  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          initialLoad={false}
        >
          {events.map((event) => (
            <EventListItem
              key={event.id}
              event={event} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}