import React, { PropTypes } from 'react';

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/plain');
var url = 'http://localhost:3005/posts/1';
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

export class Rest extends React.Component<void, void, void> {

  static propTypes = {
    fetchModels: PropTypes.func.isRequired
  };
  
  render () {
    return (
      <div>{this.rest()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(Rest)
