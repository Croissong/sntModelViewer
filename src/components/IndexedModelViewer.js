import React, { PropTypes } from 'react';
import { Table, Td, Tr } from 'reactable';
import EditButton from './EditButton';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    editModel: PropTypes.func.isRequired
  };

  fillTable = (models) => (
    models.map(model => {
      let fields = model.indexed_fields;
      return (
        <Tr key={model.id} data={fields}>
          <Td key={model.id} column=''>
            <EditButton
              id={model.id}
              editModel={this.props.editModel}
            />
          </Td>
        </Tr>
      );
    })
  );

  render () {
    let p = this.props;
    if (!p.fetching) {
      return (
        <Table className='table'>
          {this.fillTable(p.models)}
        </Table>
      );
    }
    return <div className='loader'> Loading</div>;
  }
}
