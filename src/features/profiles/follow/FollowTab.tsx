import { CardGroup, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import { useAppSelector } from "../../../app/store/store";
import FollowCard from "./FollowCard";
import { useFireStore } from "../../../app/hooks/firestore/useFirestore";
import { useEffect } from "react";
import { actions } from "./followSlice";

type Props = {
  profileId: string;
  activeTab: number;
};

export default function FollowTab({ profileId, activeTab }: Props) {
  const { data, status } = useAppSelector(state => state.follows);
  const { loadCollection: loadFollowing } = useFireStore(`profiles/${profileId}/following`);
  const { loadCollection: loadFollows } = useFireStore(`profiles/${profileId}/followers`);

  useEffect(() => {
    if (activeTab === 3) {
      loadFollowing(actions);
    }
    if (activeTab === 4) {
      loadFollows(actions);
    }
  }, [activeTab, loadFollowing, loadFollows]);

  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='user'
            content={activeTab === 3 ? 'Followers' : 'Following'} />
        </GridColumn>
        <GridColumn width={16}>
          <CardGroup itemsPerRow={5}>
            {data.map(profile => (
              <FollowCard profile={profile} key={profile.id} />
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  );
}