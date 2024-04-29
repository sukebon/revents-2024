import { Button, Card, Grid, Header, TabPane, Image, CardGroup, GridColumn } from 'semantic-ui-react';
import { Photo, Profile } from '../../app/types/profile';
import { useEffect, useState } from 'react';
import { auth, storage } from '../../app/config/firebase';
import PhotoUpload from './PhotoUpload';
import { useAppSelector } from '../../app/store/store';
import { useFireStore } from '../../app/hooks/firestore/useFirestore';
import { actions } from './photoSlice';
import { updateProfile } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import { batchSetPhoto } from '../../app/actions/firestoreActions';

type Props = {
  profile: Profile;
};

export default function ProfilePhoto({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const { data: photos, status } = useAppSelector(state => state.photos);
  const { loadCollection, remove } = useFireStore(`profiles/${profile.id}/photos`);

  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  async function handleSetMain(photo: Photo) {
    await batchSetPhoto(photo.url);
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url
    });
  }

  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='photo' content={'Photos'} />
          <Button
            floated='right'
            basic
            content={editMode ? 'Cancel' : 'add photo'}
            onClick={() => setEditMode(!editMode)}
          />
        </GridColumn>
        <GridColumn width={16}>
          {editMode ? <PhotoUpload profile={profile} setEditMode={setEditMode} /> : (
            <CardGroup itemsPerRow={3}>
              {photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group>
                      <Button
                        onClick={() => handleSetMain(photo)}
                        basic color='green'
                        disabled={photo.url === profile.photoURL}
                      >
                        Main
                      </Button>
                      <Button
                        onClick={() => handleDeletePhoto(photo)}
                        basic
                        color='red'
                        icon='trash'
                        disabled={photo.url === profile.photoURL}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane >
  );
}