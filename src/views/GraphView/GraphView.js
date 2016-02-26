import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as defSelectActions, fetchModeldefs } from 'redux/modules/modelDefSelection';
import { fetchIndexedModels } from 'redux/modules/indexedModels';
import ModelViewer from 'components/ModelViewer';
import ModelDefSelection from 'components/ModelDefSelection';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class GraphView extends React.Component {

  static propTypes = {
    modeldefs: PropTypes.object.isRequired,
    fetchModeldefs: PropTypes.func.isRequired,
    selectModeldef: PropTypes.func.isRequired,
    fetchIndexedModels: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <ModelDefSelection
          modeldefs={this.props.modeldefs}
          fetchModeldefs={this.props.fetchModeldefs}
          selectModeldef={this.props.selectModeldef}
          fetchIndexedModels={this.props.fetchIndexedModels}
        />
        <ModelViewer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modeldefs: state.modelSelection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchModeldefs: () => dispatch(fetchModeldefs()),
    selectModeldef: (id) => dispatch(defSelectActions.selectModeldef(id)),
    fetchIndexedModels: (modeldefId) => dispatch(fetchIndexedModels(modeldefId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphView);

