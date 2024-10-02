import { ClientLinks, Favorite } from '../../components/ClientComponents';
import Layout from '../../components/Layout';

const ClientFavroite = () => {
  return (
    <>
      <Layout>
        <section className="section  pt-0">
          <div className="wrap">
            <div className="row">
              <div className="col-3">
                <ClientLinks />
              </div>
              <div className="col-8 ml-auto">
                <Favorite />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ClientFavroite;
