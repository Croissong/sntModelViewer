import React, { PropTypes } from 'react';
import {Table} from 'reactable';
/* var ModelEditor = window.ModelEditor; */
/* var ModelSelect = window.ModelSelect; */

type Props = {
  models: Array
};

export default class ModelViewer extends React.Component<void, Props, void> {
  static propTypes = {
    models: PropTypes.array.isRequired
  }
  render () {
    return (
      <Table className='table' data={[
        { Name: 'Griffin Smith', Age: 18 },
        { Age: 23, Name: 'Lee Salminen' },
        { Age: 28, Position: 'Developer' }
      ]} />
    );
  }
}
