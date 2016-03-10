import React, { PropTypes } from 'react';

export default class EditButton extends React.Component {

  static propTypes = {
    modelDef: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editModel: PropTypes.func.isRequired
  }

  onClick = () => this.props.editModel(this.props.modelDef, this.props.id);

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
