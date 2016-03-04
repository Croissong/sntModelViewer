import React, { PropTypes } from 'react';
import { Table, Td, Tr } from 'reactable';
import EditButton from 'components/EditButton';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: PropTypes.object,
    editModel: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired
  };

  fillTable = (models) => (
    Object.keys(models).map(i => {
      let model = models[i];
      return (
        <Tr key={model.id} data={model}>
          <Td key={model.id} column=''>
            <EditButton
              model={model}
              editModel={this.props.editModel}
            />
          </Td>
        </Tr>
      );
    })
  );

  render () {
    let models = this.props.models;
    let fetching = this.props.fetching;
    return (
      <Table className='table'>
        {!fetching && this.fillTable(models)}
        {fetching && <div className='loader'> Loading</div>}
      </Table>
    );
  }
}
