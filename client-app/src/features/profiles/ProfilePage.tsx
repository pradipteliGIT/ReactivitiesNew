import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { profile, loadingProfile, loadProfile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
    return () => setActiveTab(0);
  }, [username, loadProfile, setActiveTab]);

  if (loadingProfile) return <LoadingComponent content='Loading profile data' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default observer(ProfilePage);
