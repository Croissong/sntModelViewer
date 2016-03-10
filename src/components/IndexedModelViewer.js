import React, { PropTypes } from 'react';
import { Table, Td, Tr } from 'reactable';
import EditButton from 'components/EditButton';
import i from 'icepick';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    modelDef: PropTypes.string.isRequired,
    models: PropTypes.object.isRequired,
    editModel: PropTypes.func.isRequired
  };

  fillTable = (models) => (
    Object.keys(models).map(i => {
      let field = models[i].indexed_fields;
      return (
        <Tr key={field.id} data={field}>
          <Td key={field.id} column=''>
            <EditButton
              modelDef={this.props.modelDef}
              id={field.id}
              editModel={this.props.editModel}
            />
          </Td>
        </Tr>
      );
    })
  );

  render () {
    let p = this.props;
    // un-freeze (icepick) object when interfacing with other library
    let models = i.thaw(p.models);
    if (!p.models.indexed_fetching) {
      return (
        <Table className='table'>
          {this.fillTable(models)}
        </Table>
      );
    }
    return <div className='loader'> Loading</div>;
  }
}
