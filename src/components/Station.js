import React from 'react';

const Station = (props) => {
  return (
    <div>
      <details>
        <summary>
          {props.entity_id}
        </summary>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </details>
    </div>
  );
};

export default Station;
