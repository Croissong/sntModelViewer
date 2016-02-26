import React, { PropTypes } from 'react';
import {Table, Td, Tr, Thead, Th} from 'reactable';
import EditButton from 'components/EditButton';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    editModel: PropTypes.func.isRequired,
    fetchModel: PropTypes.func.isRequired
  }

  editModel = (id) => {
    this.props.editModel(id);
    this.props.fetchModel(id);
  }

  render () {
    let models = this.props.models;
    return (
      <div>
        <Table className='table'>
          <Thead>
            <Th column='Name'>
              <strong className='name-header'>First Name, Last Name</strong>
            </Th>
            <Th column='Age'>
              <em className='age-header'>Age, years</em>
            </Th>
            <Th column='Position'>
              <em className='age-header'>Position</em>
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
