import { Done, DoneAll } from '@mui/icons-material';
import React from 'react';

const StatusTick = ({ status = 'sent' }) => {
  const seen = status === 'seen';
  const delivered = status === 'delivered';

  return (
    <div className="delivered-status">
      {delivered || seen ? (
        <DoneAll className={seen ? 'seen' : ''} />
      ) : (
        <Done />
      )}
    </div>
  );
};

export default StatusTick;
