import React, { PropTypes } from 'react';
import { Td } from 'reactable';

export default class EditModelColumn extends React.Component {

  static propTypes = {
    modelId: PropTypes.string.isRequired,
    editModel: PropTypes.function.isRequired
  }

  onClick = () => {this.props.editModel(this.props.modelId)};

  render () {
    return (
      <Td column=''>
        <button
          type='button'
          onClick={onClick}>
          Edit Model
        </button>
      </Td>
    );
  }
}
