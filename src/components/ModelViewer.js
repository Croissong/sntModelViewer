import React, { PropTypes } from 'react';
import {Table, Tr, Td, Thead, Th} from 'reactable';

export default class ModelViewer extends React.Component<void, void, void> {

  static propTypes = {
    models: PropTypes.arrayOf(React.PropTypes.object).isRequired,
    editModel: PropTypes.function.isRequired
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
                <button key={model.id} type='button' onClick={this.props.editModel.bind(this, model.id)}> Edit Model </button>
              </Td>
            </Tr>
           )}
        </Table>
      </div>
    );
  }
}
