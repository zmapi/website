/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

class Help extends React.Component {
  render() {
    const language = this.props.language || '';
    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site.](${docUrl(
          'try-it-out.html',
          language,
        )})`,
        title: 'Browse Docs',
      },
			{
				title: "Browse Fixplorer",
				content: "Find message, field, capability definitions and more in our interactive FIX dictionary Fixplorer."
			},
      {
				content: 'You can join the conversation in our IRC channel [#zmapi @ ircnet](http://webchat.freenode.net/?channels=zmapi).',
        title: 'Discuss',
      },
      {
				content: "All the source code is available under our [github organization](https://github.com/zmapi). Browse and submit issues or pull requests for bugs you find or any new features you may want implemented.",
        title: 'GitHub',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h1>Need help?</h1>
            </header>
            <p>If you need help with ZMAPI, you can try one of the mechanisms below.</p>
            <GridBlock contents={supportLinks} layout="fourColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
