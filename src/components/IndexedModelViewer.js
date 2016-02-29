import React, { PropTypes } from 'react';
import { Table, Td, Tr } from 'reactable';
import EditButton from 'components/EditButton';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: PropTypes.object.isRequired,
    editModel: PropTypes.func.isRequired
  }

  render () {
    let models = this.props.models.indexedModels;
    return (
      <div>
        <Table className='table'>
          {Object.keys(models).map(i => {
             let model = models[i];
             return (
               <Tr key={model.id} data={model}>
                 <Td key={model.id} column=''>
                   <EditButton
                     modelId={model.id}
                     editModel={this.props.editModel}
                   />
                 </Td>
               </Tr>
             );
           })}
        </Table>
      </div>
    );
  }
}
