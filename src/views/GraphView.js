import React from 'react';

import ModelSelection from 'containers/ModelSelection';
import ModelViewer from 'containers/ModelViewer';

export default class GraphView extends React.Component {

  render () {
    return (
      <div className='graphView'>
        <ModelSelection/>
        <ModelViewer/>
      </div>
    );
  }
}
