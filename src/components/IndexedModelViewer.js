import React, { PropTypes } from 'react';
import {Table, Td, Tr, Thead, Th} from 'reactable';
import EditButton from 'components/EditButton';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: PropTypes.object.isRequired,
    editModel: PropTypes.func.isRequired
  }

  render () {
    let models = this.props.models.value;
    return (
      <div>
        <Table className='table'>
          <Thead>
            <Th column='Name'>
              <strong>Name</strong>
            </Th>
            <Th column='Age'>
              <em>Age</em>
            </Th>
            <Th column='Position'>
              <em>Position</em>
            </Th>
            <Th column=''>
              <em className='age-header'></em>
            </Th>
          </Thead>
          {models.map(model =>
            <Tr key={model.id} data={model}>
              <Td key={model.id} column=''>
                <EditButton
                    modelId={model.id}
                    editModel={this.editModel}
                />
              </Td>
            </Tr>
           )}
        </Table>
      </div>
    );
  }
}
