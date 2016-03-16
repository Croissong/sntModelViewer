import React, { PropTypes as PT } from 'react';

export default class EditButton extends React.Component {

  static propTypes = {
    id: PT.string.isRequired,
    editModel: PT.func.isRequired
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
