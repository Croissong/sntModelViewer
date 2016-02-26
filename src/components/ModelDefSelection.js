import React, { PropTypes } from 'react';

export default class ModelDefSelection extends React.Component {

  static propTypes = {
    modeldefs: PropTypes.object.isRequired,
    fetchModeldefs: PropTypes.func.isRequired,
    selectModeldef: PropTypes.func.isRequired,
    fetchIndexedModels: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.fetchModeldefs();
    this.props.fetchIndexedModels('1');
    this.props.selectModeldef('1');
  };

  select = (e) => {
    let id = e.target.value;
    this.props.selectModeldef(id);
    this.props.fetchIndexedModels(id);
  };

  render () {
    let defs = this.props.modeldefs.defs;
    let selected = defs.filter(def => def.id === this.props.modeldefs.selected);
    return (
      <div>
        <select name='modeldefs' id='modeldefs' value={selected.name} onChange={this.select}>
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
