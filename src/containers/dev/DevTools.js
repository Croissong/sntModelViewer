import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

installDevTools(Immutable);

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q' >
    <LogMonitor />
  </DockMonitor>
);
