import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfileEditForm from './ProfileEditForm';

function ProfileAbout() {
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore();

  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode((prev) => !prev)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {!editMode ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          ) : (
            <ProfileEditForm setEditMode={setEditMode} />
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileAbout);
