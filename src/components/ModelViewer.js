import React, { PropTypes } from 'react';
import {Table} from 'reactable';

export default class ModelViewer extends React.Component<void, void, void> {

  static propTypes = {
    models: PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  render () {
    return (
      <div>
        <Table className='table' data={this.props.models} />
      </div>
    );
  }
}
