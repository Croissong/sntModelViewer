import React, { PropTypes } from 'react';

export default class ModelEditor extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired
  }

  render () {
    let model = this.props.model;
    return (
      <div>{JSON.stringify(model)}</div>
    );
  }
}
