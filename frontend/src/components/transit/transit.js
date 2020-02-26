/*global google*/
import React from 'react';

class Transit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  componentDidMount() {
    this.props.transit('morning')
  }

  render() {

    return (
      <div>
        <ul>
         {this.state.test}
        </ul>
      </div>
    )
  }
}

export default Transit;
