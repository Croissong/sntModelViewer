import React, { PropTypes } from 'react';

export default class EditButton extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    editModel: PropTypes.func.isRequired
  }

  onClick = () => this.props.editModel(this.props.model.modelDef, this.props.model.id);

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
