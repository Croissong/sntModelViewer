import React, { PropTypes } from 'react';
import EditorForm from 'components/EditorForm';

export default class ModelEditor extends React.Component {

  static propTypes = {
    fetching: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    editedModel: PropTypes.object
  };

  render () {
    let p = this.props;
    if (!p.fetching && p.active) {
      return (
        <EditorForm
          editedModel={p.editedModel}
        />
      );
    }
    return null;
  }
}
