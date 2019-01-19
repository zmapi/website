/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
    <h2 className="projectTitle">
      {/* siteConfig.title */}
      <big>{siteConfig.tagline}</big>
    </h2>    
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return <SplashContainer>
        <div className="inner">
          <Logo img_src={imgUrl("black_logo.png")} />
          <ProjectTitle />
          <PromoSection>
            <Button href="#try">Try It Out</Button>
          </PromoSection>
        </div>
      </SplashContainer>;
  }
}

const Block = props =>  (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container> 
);

const Features = () => (
  <Block layout="fourColumn" background="#000">
    {[
      {
        content:
          "As an extension of language agnosticism any operating system that support ZMQ sockets is supported as well.",
        image: imgUrl("icon_platform.png"),
        imageAlign: "top",
        title: "Cross Platform"
      },
      {
        content:
          "Finance standard FIX messages are used with some necessary modifications. FIX over JSON is used by default for quick prototyping and experimentation.",
        image: imgUrl("icon_fix.png"),
        imageAlign: "top",
        title: "FIX Standard Messages"
      },
      {
        content:
          "High performance messaging is supported optionally via binary protocols, such as SBE. ZMQ sockets are very fast.",
        image: imgUrl("icon_perform.png"),
        imageAlign: "top",
        title: "High Performance"
      },
      {
        content:
          "Write applications using the language of your choice. ZMAPI is simply a messaging standard, not a library. Programs can easily be written without use of any ZMAPI specific libraries.",
        image: imgUrl("icon_lang.png"),
        imageAlign: "top",
        title: "Language Agnostic"
      },
      {
        content:
          "It's time for the financial world to stop praising the word 'proprietary'.",
        image: imgUrl("icon_os.png"),
        imageAlign: "top",
        title: "Open Source"
      },
      {
        content:
          "Works with nearly any market data or execution vendor. If there is a connector module for your favorite vendor API then you are good to go.",
        image: imgUrl("icon_api.png"),
        imageAlign: "top",
        title: "Vendor Agnostic"
      },
      {
        content:
          "Ultra fast and convenient ZMQ sockets are utilized for messaging.",
        image: imgUrl("icon_zmq.png"),
        imageAlign: "top",
        title: "ZMQ Sockets"
      }
    ]}
  </Block>
);

// const FeatureCallout = () => (
//   <div
//     className="productShowcaseSection paddingBottom"
//     style={{textAlign: 'center'}}>
//     <h2>Feature Callout</h2>
//     <MarkdownBlock>These are features of this project</MarkdownBlock>
//   </div>
// );

// const LearnHow = () => (
//   <Block background="light">
//     {[
//       {
//         content: 'Talk about learning how to use this',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'right',
//         title: 'Learn How',
//       },
//     ]}
//   </Block>
// );

const TryOut = () => (
  <Block id="try">
    {[
      {
				content: 'TODO: guide on how to connect to ZMAPI test server to try programming against the API.',
        image: imgUrl('logo.png'),
        imageAlign: 'left',
        title: 'Try it Out!',
      },
    ]}
  </Block>
);

// const Description = () => (
//   <Block background="dark">
//     {[
//       {
//         content: 'This is another description of how this project is useful',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'right',
//         title: 'Description',
//       },
//     ]}
//   </Block>
// );

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Who is Using This?</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
            <Features />
          <div className="tryoutContainer">
            <TryOut />
          </div>
          <Showcase language={language} />
        </div>
      </div>;
  }
}

module.exports = Index;
