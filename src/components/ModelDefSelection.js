import React, { PropTypes as PT} from 'react';
import IPT from 'react-immutable-proptypes';

export default class ModelDefSelection extends React.Component {

  static propTypes = {
    modelDefs: IPT.list.isRequired,
    selected: PT.string.isRequired,
    fetchModelDefs: PT.func.isRequired,
    selectModelDef: PT.func.isRequired
  }

  select = (e) => {
    let id = e.target.value;
    this.props.selectModelDef(id);
  };

  render () {
    let {modelDefs, fetchModelDefs, selected} = this.props;
    return (
      <div>
        <select name='modeldefs' id='modeldefs' value={selected} onChange={this.select}>
          {modelDefs.map(def =>
            <option
              key={def}
              value={def}
              label={def}
            />
           )}
        </select>
        <button type='button' onClick={fetchModelDefs}> Refresh Modeldefs </button>
      </div>
    );
  }
}
