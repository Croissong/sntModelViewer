import React, { PropTypes } from 'react';

import ModelViewer from 'containers/ModelViewer';
import ModelSelection from 'containers/ModelSelection';

export class GraphView extends React.Component {

  render () {
    return (
      <div className='graphView'>
        <ModelSelection/>
        <ModelEditor/>
      </div>
    );
  }
}
