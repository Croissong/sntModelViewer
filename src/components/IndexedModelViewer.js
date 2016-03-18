import React, { PropTypes as PT } from 'react';
import IPT from 'react-immutable-proptypes';
import { Table, Td, Tr } from 'reactable';
import EditButton from './EditButton';
import classes from 'styles/loader.scss';

export default class IndexedModelViewer extends React.Component {

  static propTypes = {
    models: IPT.list.isRequired,
    fetching: PT.bool.isRequired,
    editModel: PT.func.isRequired
  };

  fillTable = () => {
    let { models, editModel } = this.props;
    return models.map(({ id, fields }) => (
      <Tr key={id} data={fields.toJS()}>
        <Td column=''>
          <EditButton
            id={id}
            editModel={editModel}
          />
        </Td>
      </Tr>
    )).toJS();
  };

  render () {
    let { fetching } = this.props;
    if (!fetching) {
      return (
        <Table className='table'>
          {this.fillTable()}
        </Table>
      );
    }
    return <div className={classes.spinner}/>;
  }
}
