import React, { PropTypes } from 'react';

export default class ModelEditor extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired
  }

  render () {
    let model = this.props.model;
    return (
      <div>{this.props.active && JSON.stringify(model)}</div>
    );
  }
}
