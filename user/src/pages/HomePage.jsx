import React, { useEffect } from 'react';
import { Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import AppURL from '../api/AppURL';
import Categories from '../components/home/Categories';
import Authors from '../components/home/Authors';
import Collection from '../components/home/Collection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HomeTop from '../components/home/HomeTop';
import HomeTopMobile from '../components/home/HomeTopMobile';
import NewArrival from '../components/home/NewArrival';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import axios from 'axios';

const HomePage = () => {
  useEffect(() => {
    window.scroll(0, 0);
    GetVisitorDetails();
  }, []);

  const GetVisitorDetails = () => {
    axios.get(AppURL.VisitorDetails).then().catch();
  };

  return (
    <Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
        <HomeTop />
      </div>

      <div className="Mobile">
        <NavMenuMobile />
        <HomeTopMobile />
      </div>

      <FeaturedProducts />
      <Collection />
      {/* <Categories /> */}
      <Authors />
      <NewArrival />

      <div className="Desktop">
        <FooterDesktop />
      </div>

      <div className="Mobile">
        <FooterMobile />
      </div>
    </Fragment>
  );
};

export default HomePage;
