/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51I63v0GeTwyWnPJKaZcZBdlvjTrZCrUCPGJmNdERKgdsNP8bBk9JmqhQ2Hbfg9FHZK5Az3tF9fZm4qn7o3cmPoxt00fGs7GITB'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
