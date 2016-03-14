import React, { PropTypes } from 'react';

export default class EditButton extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    editModel: PropTypes.func.isRequired
  }

  onClick = () => this.props.editModel(this.props.id);

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
