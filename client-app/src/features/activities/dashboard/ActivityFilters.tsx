import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 28 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Activities'
          active={predicate.has('all')}
          onClick={() => setPredicate('all', 'true')}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has('isGoing')}
          onClick={() => setPredicate('isGoing', 'true')}
        />
        <Menu.Item
          content="I'm hosting'"
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
        />
      </Menu>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 28 }}>
        <Header icon='calendar' attached color='teal' content='Select Date' />
        <Calendar
          onChange={(date: any) => setPredicate('startDate', date as Date)}
          value={predicate.get('startDate') || new Date()}
        />
      </Menu>
    </>
  );
}

export default observer(ActivityFilters);
