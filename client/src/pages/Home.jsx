/* eslint-disable no-unused-vars */

import Layout from '../components/Layout';

export const HomePage = () => {
  return (
    <Layout>
      <section className="section section--hero">
        <div className="wrap">
          <h1 className="text-white">Welcome</h1>
          <p className="h6">MERN Stack project</p>
          <p className="h6">A simple password manager with enterprise features</p>

          <a
            href="https://github.com/webyant/webvault"
            target={'_blank'}
            rel="noreferrer"
            className="btn"
          >
            Code
          </a>
        </div>
      </section>
    </Layout>
  );
};
