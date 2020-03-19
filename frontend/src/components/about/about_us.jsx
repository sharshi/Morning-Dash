import React from "react";
import { withRouter, Link } from "react-router-dom";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-us-container">
        <div className="about-us">
          <div className="about-member">
            <img src="https://avatars3.githubusercontent.com/u/4740525?s=460&v=4"></img>
            <div>Shersheial Borisute</div>
            <div>Project Creator</div>
            <div className="pro-links">
              <a href="https://github.com/sharshi">
                <i class="devicon-github-plain"></i>
              </a>
              <a href="https://angel.co/sharshi">
                <img src="https://diskord-pro.s3.amazonaws.com/angellist.png" />
              </a>
              <a href="https://linkedin.com/in/sharshi">
                <img src="https://diskord-pro.s3.amazonaws.com/linkedin.svg" />
              </a>
            </div>
          </div>
          <div className="about-member">
            <img src="https://avatars2.githubusercontent.com/u/7884713?s=460&v=4"></img>
            <div>Albert Lee</div>
            <div>Frontend Engineer</div>
            <div className="pro-links">
              <a href="https://github.com/al6">
                <i class="devicon-github-plain"></i>
              </a>
              <a href="https://angel.co/albertlee">
                <img src="https://diskord-pro.s3.amazonaws.com/angellist.png" />
              </a>
              <a href="https://linkedin.com/in/albertlee3">
                <img src="https://diskord-pro.s3.amazonaws.com/linkedin.svg" />
              </a>
            </div>
          </div>
          <div className="about-member">
            <img src="https://avatars2.githubusercontent.com/u/56453063?s=460&v=4"></img>
            <div>Raz Efron</div>
            <div>Backend Engineer</div>
            <div className="pro-links">
              <a href="https://github.com/RazEfron">
                <i class="devicon-github-plain"></i>
              </a>
              <a href="https://angel.co/raz-efron">
                <img src="https://diskord-pro.s3.amazonaws.com/angellist.png" />
              </a>
              <a href="https://www.linkedin.com/in/raz-efron-72b3301a4/">
                <img src="https://diskord-pro.s3.amazonaws.com/linkedin.svg" />
              </a>
            </div>
          </div>
          <div className="about-member">
            <img src="https://avatars2.githubusercontent.com/u/56134478?s=400&v=4"></img>
            <div>Neev Granite</div>
            <div>Flex Engineer </div>
            <div className="pro-links">
              <a href="https://github.com/lifesscholar">
                <i class="devicon-github-plain"></i>
              </a>
              <a href="https://angel.co/neevgranite">
                <img src="https://diskord-pro.s3.amazonaws.com/angellist.png" />
              </a>
              <a href="https://linkedin.com/in/neevgranite">
                <img src="https://diskord-pro.s3.amazonaws.com/linkedin.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AboutUs);
