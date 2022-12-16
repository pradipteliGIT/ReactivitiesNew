import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
  errors: any;
}
function ValidationError({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: string, i: any) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}

export default ValidationError;
