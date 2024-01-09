import Loader from 'components/Loader/Loader';
import { Component } from 'react';

export class Image extends Component {
  state = { loaded: false };

  onLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    return (
      <>
        {!this.state.loaded && <Loader />}
        <img src={this.props.src} alt={this.props.tags} onLoad={this.onLoad} />
      </>
    );
  }
}

export default Image;
