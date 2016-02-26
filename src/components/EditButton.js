import React, { PropTypes } from 'react';

export default class EditButton extends React.Component {

  static propTypes = {
    modelId: PropTypes.number.isRequired,
    editModel: PropTypes.func.isRequired
  }

  onClick = () => this.props.editModel(this.props.modelId);

  render () {
    return (
      <button
        type='button'
        onClick={this.onClick}>
        Edit Model
      </button>
    );
  }
}
