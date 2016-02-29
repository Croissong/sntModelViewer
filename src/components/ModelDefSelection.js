import React, { PropTypes } from 'react';

export default class ModelDefSelection extends React.Component {

  static propTypes = {
    modelDefs: PropTypes.object.isRequired,
    fetchModelDefs: PropTypes.func.isRequired,
    selectModelDef: PropTypes.func.isRequired
  }

  select = (e) => {
    let id = e.target.value;
    this.props.selectModelDef(id);
  };

  render () {
    let defs = this.props.modelDefs.modelDefs;
    let selected = defs[this.props.modelDefs.selected];
    return (
      <div>
        <select name='modeldefs' id='modeldefs' value={selected} onChange={this.select}>
          {defs.map(def =>
            <option
              key={def}
              value={def}
              label={def}
            />
           )}
        </select>
        <button type='button' onClick={this.props.fetchModelDefs}> Refresh Modeldefs </button>
      </div>
    );
  }
}
