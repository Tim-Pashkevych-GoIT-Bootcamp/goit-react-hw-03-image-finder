import Loader from 'components/Loader/Loader';
import { Component } from 'react';

export class Image extends Component {
  state = { showLoader: false };

  componentDidMount() {
    if (this.props.showLoader) {
      this.setState({ showLoader: true });
    }
  }

  onLoad = () => {
    this.setState({ showLoader: false });
  };

  render() {
    return (
      <>
        {this.state.showLoader && <Loader />}
        <img src={this.props.src} alt={this.props.tags} onLoad={this.onLoad} />
      </>
    );
  }
}

export default Image;
