import React, { PropTypes } from 'react';

export default class ModelDefSelection extends React.Component {

  static propTypes = {
    modelDefs: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    fetchModelDefs: PropTypes.func.isRequired,
    selectModelDef: PropTypes.func.isRequired
  }

  select = (e) => {
    let id = e.target.value;
    this.props.selectModelDef(id);
  };

  render () {
    let p = this.props;
    return (
      <div>
        <select name='modeldefs' id='modeldefs' value={p.selected} onChange={this.select}>
          {p.modelDefs.map(def =>
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
