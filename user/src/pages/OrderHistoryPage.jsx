import React, { Component, Fragment } from 'react';
import OrderList from '../components/Cart/OrderList';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import { ExtendOrder } from '../components/Cart/ExtendOrder';

export class OrderHistoryPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const { match, user } = this.props;
    const { invoice_no } = match.params;
    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>

        <div className="Mobile">
          <NavMenuMobile />
        </div>

        <OrderList user={user} invoice_no={invoice_no} />
        

        <div className="Desktop">
          <FooterDesktop />
        </div>

        <div className="Mobile">
          <FooterMobile />
        </div>
      </Fragment>
    );
  }
}

export default OrderHistoryPage;
