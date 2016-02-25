import React, { PropTypes } from 'react';

export default class ModelSelection extends React.Component<void, void, void> {
  static propTypes = {
    modeldefs: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    fetchModeldefs: PropTypes.func.isRequired,
    selectModeldef: PropTypes.func.isRequired,
    fetchModels: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.fetchModeldefs();
    this.props.fetchModels('1');
    this.props.selectModeldef('1');
  };

  select = (e) => {
    let id = e.target.value;
    this.props.selectModeldef(id);
    this.props.fetchModels(id);
  };

  render () {
    let defs = this.props.modeldefs;
    let selected = defs.filter(def => def.id === this.props.selected);
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
