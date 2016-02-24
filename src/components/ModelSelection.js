import React, { PropTypes } from 'react';

export default class ModelSelection extends React.Component<void, void, void> {
  static propTypes = {
    modeldefs: PropTypes.object.isRequired,
    fetchModeldefs: PropTypes.func.isRequired,
    selectModeldef: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.fetchModeldefs();
  };
  render () {
    let defs = this.props.modeldefs.defs;
    return (
      <div>
        <select name='modeldefs' id='modeldefs' >
          {defs.map(def =>
            <option key={def.id} value={def.id}>
              {def.name}
            </option>
           )}
        </select>
        <button type='button' onClick={this.props.fetchModeldefs}> Refresh Modeldefs </button>
      </div>
    );
  }
}
