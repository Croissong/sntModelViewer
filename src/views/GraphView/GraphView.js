/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchModels } from '../../redux/modules/models';
import { actions as modeldefsActions, fetchModeldefs } from '../../redux/modules/modeldefs';
import ModelViewer from 'components/ModelViewer';
import ModelSelection from 'components/ModelSelection';

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class GraphView extends React.Component<void, void, void> {

  static propTypes = {
    modeldefs: PropTypes.object.isRequired,
    models: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchModeldefs: PropTypes.func.isRequired,
    selectModeldef: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <ModelSelection
          modeldefs={this.props.modeldefs}
          fetchModeldefs={this.props.fetchModeldefs}
          selectModeldef={this.props.selectModeldef}
        />
        <ModelViewer
          models={this.props.models}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    models: state.models,
    modeldefs: state.modeldefs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchModeldefs: () => dispatch(fetchModeldefs()),
    selectModeldef: (id) => {
      dispatch(modeldefsActions.selectModeldef(id));
      dispatch(fetchModels(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphView);

