import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
  attendees: Profile[];
}

function ActivityListItemAttendee({ attendees }: Props) {
  const styles = {
    borderColor: 'orange',
    borderWidth: 2,
  };

  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.userName}
          trigger={
            <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`}>
              <Image
                size='mini'
                circular
                bordered
                style={attendee.following ? styles : null}
                src={attendee.image || '/assets/user.png'}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);
