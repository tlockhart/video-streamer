import React, { Component } from "react";
// add below the other import statements

import Header from "./Header";
import Footer from "./Footer";

export default class Player extends Component {
  constructor(props) {
    super(props);
    console.log("Props:", props);
    this.state = {
      videoId: "",
      videoData: {},
    };
  }
  async componentDidMount() {
    let url = window.location.pathname;
    console.log(`URL: ${url}`);
    let urlArray = url.split("/");
    console.log("@@@URLARRAY:", urlArray);
    const videoId = urlArray[2];
    this.setState({ videoId });
    try {
      const res = await fetch(`http://localhost:4000/video/${videoId}/data`);
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <video controls muted autoPlay crossOrigin="anonymous">
            <source
              src={`http://localhost:4000/video/${this.state.videoId}`}
              type="video/mp4"
            ></source>
            <track
              label="English"
              kind="captions"
              srcLang="en"
              src={`http://localhost:4000/video/${this.state.videoId}/caption`}
              default
            ></track>
          </video>
        </header>
        <Footer />
      </div>
    );
  }
}
