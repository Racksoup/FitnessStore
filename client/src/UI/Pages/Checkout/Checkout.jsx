import React, { useState, useEffect } from 'react';
import './Checkout.scss';
import { selectCheckout } from '../../../Redux/cartSlice';
import { selectUser, updateUserAddress } from '../../../Redux/userSlice';
import { selectCart } from '../../../Redux/cartSlice';
import Payment from './Payment/Payment.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Checkout = () => {
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [intentAmount, setIntentAmount] = useState(0);
  // const checkout = useSelector(selectCheckout);
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    appartment: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  // const [shipping, setShipping] = useState({
  //   firstName: '',
  //   lastName: '',
  //   country: '',
  //   address: '',
  //   appartment: '',
  //   city: '',
  //   province: '',
  //   postalCode: '',
  // });

  const usaStates = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
    {
      name: 'American Samoa',
      abbreviation: 'AS',
    },
    {
      name: 'Arizona',
      abbreviation: 'AZ',
    },
    {
      name: 'Arkansas',
      abbreviation: 'AR',
    },
    {
      name: 'California',
      abbreviation: 'CA',
    },
    {
      name: 'Colorado',
      abbreviation: 'CO',
    },
    {
      name: 'Connecticut',
      abbreviation: 'CT',
    },
    {
      name: 'Delaware',
      abbreviation: 'DE',
    },
    {
      name: 'District Of Columbia',
      abbreviation: 'DC',
    },
    {
      name: 'Federated States Of Micronesia',
      abbreviation: 'FM',
    },
    {
      name: 'Florida',
      abbreviation: 'FL',
    },
    {
      name: 'Georgia',
      abbreviation: 'GA',
    },
    {
      name: 'Guam',
      abbreviation: 'GU',
    },
    {
      name: 'Hawaii',
      abbreviation: 'HI',
    },
    {
      name: 'Idaho',
      abbreviation: 'ID',
    },
    {
      name: 'Illinois',
      abbreviation: 'IL',
    },
    {
      name: 'Indiana',
      abbreviation: 'IN',
    },
    {
      name: 'Iowa',
      abbreviation: 'IA',
    },
    {
      name: 'Kansas',
      abbreviation: 'KS',
    },
    {
      name: 'Kentucky',
      abbreviation: 'KY',
    },
    {
      name: 'Louisiana',
      abbreviation: 'LA',
    },
    {
      name: 'Maine',
      abbreviation: 'ME',
    },
    {
      name: 'Marshall Islands',
      abbreviation: 'MH',
    },
    {
      name: 'Maryland',
      abbreviation: 'MD',
    },
    {
      name: 'Massachusetts',
      abbreviation: 'MA',
    },
    {
      name: 'Michigan',
      abbreviation: 'MI',
    },
    {
      name: 'Minnesota',
      abbreviation: 'MN',
    },
    {
      name: 'Mississippi',
      abbreviation: 'MS',
    },
    {
      name: 'Missouri',
      abbreviation: 'MO',
    },
    {
      name: 'Montana',
      abbreviation: 'MT',
    },
    {
      name: 'Nebraska',
      abbreviation: 'NE',
    },
    {
      name: 'Nevada',
      abbreviation: 'NV',
    },
    {
      name: 'New Hampshire',
      abbreviation: 'NH',
    },
    {
      name: 'New Jersey',
      abbreviation: 'NJ',
    },
    {
      name: 'New Mexico',
      abbreviation: 'NM',
    },
    {
      name: 'New York',
      abbreviation: 'NY',
    },
    {
      name: 'North Carolina',
      abbreviation: 'NC',
    },
    {
      name: 'North Dakota',
      abbreviation: 'ND',
    },
    {
      name: 'Northern Mariana Islands',
      abbreviation: 'MP',
    },
    {
      name: 'Ohio',
      abbreviation: 'OH',
    },
    {
      name: 'Oklahoma',
      abbreviation: 'OK',
    },
    {
      name: 'Oregon',
      abbreviation: 'OR',
    },
    {
      name: 'Palau',
      abbreviation: 'PW',
    },
    {
      name: 'Pennsylvania',
      abbreviation: 'PA',
    },
    {
      name: 'Puerto Rico',
      abbreviation: 'PR',
    },
    {
      name: 'Rhode Island',
      abbreviation: 'RI',
    },
    {
      name: 'South Carolina',
      abbreviation: 'SC',
    },
    {
      name: 'South Dakota',
      abbreviation: 'SD',
    },
    {
      name: 'Tennessee',
      abbreviation: 'TN',
    },
    {
      name: 'Texas',
      abbreviation: 'TX',
    },
    {
      name: 'Utah',
      abbreviation: 'UT',
    },
    {
      name: 'Vermont',
      abbreviation: 'VT',
    },
    {
      name: 'Virgin Islands',
      abbreviation: 'VI',
    },
    {
      name: 'Virginia',
      abbreviation: 'VA',
    },
    {
      name: 'Washington',
      abbreviation: 'WA',
    },
    {
      name: 'West Virginia',
      abbreviation: 'WV',
    },
    {
      name: 'Wisconsin',
      abbreviation: 'WI',
    },
    {
      name: 'Wyoming',
      abbreviation: 'WY',
    },
  ];

  const provinces = [
    {
      name: 'Alberta',
      abbreviation: 'AB',
    },
    {
      name: 'British Columbia',
      abbreviation: 'BC',
    },
    {
      name: 'Manitoba',
      abbreviation: 'MB',
    },
    {
      name: 'New Brunswick',
      abbreviation: 'NB',
    },
    {
      name: 'Newfoundland and Labrador',
      abbreviation: 'NL',
    },
    {
      name: 'Northwest Territories',
      abbreviation: 'NT',
    },
    {
      name: 'Nova Scotia',
      abbreviation: 'NS',
    },
    {
      name: 'Nunavut',
      abbreviation: 'NU',
    },
    {
      name: 'Ontario',
      abbreviation: 'ON',
    },
    {
      name: 'Prince Edward Island',
      abbreviation: 'PE',
    },
    {
      name: 'Quebec',
      abbreviation: 'QC',
    },
    {
      name: 'Saskatchewan',
      abbreviation: 'SK',
    },
    {
      name: 'Yukon Territory',
      abbreviation: 'YT',
    },
  ];

  useEffect(() => {
    if (user) {
      setAddress(user.address);
    }
  }, []);

  useEffect(() => {
    const fetchKey = async () => {
      const res = await axios.get('/api/payment/config');
      setStripePromise(loadStripe(res.data.publishableKey));
    };
    fetchKey();
  }, []);

  useEffect(() => {
    const fetchKey = async () => {
      let customer_stripe_id = false;
      if (user.customer_stripe_id) {
        customer_stripe_id = user.customer_stripe_id;
      }
      const res = await axios.post('/api/payment/invoice', {
        email: user.email,
        name: user.name,
        customer_stripe_id,
        user_id: user._id,
        priceItems: cart.cart,
      });
      setClientSecret(res.data.clientSecret);
      setIntentAmount(res.data.intentAmount);
    };
    fetchKey();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!stripe || !elements) {
    //   return;
    // }
  };

  return (
    <div className='Checkout'>
      <h1>Checkout</h1>
      <div className='Content'>
        <div className='Shipping-Address'>
          <div className='Title'>
            <h3>Shipping Address</h3>
            <p
              onClick={() =>
                setAddress({
                  firstName: '',
                  lastName: '',
                  country: '',
                  address: '',
                  appartment: '',
                  city: '',
                  province: '',
                  postalCode: '',
                  phone: '',
                  email: '',
                })
              }
            >
              Clear Address
            </p>
          </div>
          <div className='HalfLine'>
            <div className='HalfBox'>
              <p>First name</p>
              <input
                value={address.firstName}
                type='text'
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
              />
            </div>
            <div className='HalfBox'>
              <p>Last name</p>
              <input
                value={address.lastName}
                type='text'
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className='Line'>
            <p>Country / Region</p>
            <div className='DropBox'>
              {address.country !== '' && <p>{address.country}</p>}
              <div className='DropItems'>
                <p
                  onClick={() => {
                    setCountry('canada');
                    setAddress({ ...address, country: 'Canada' });
                  }}
                >
                  Canada
                </p>
                <p
                  onClick={() => {
                    setCountry('usa');
                    setAddress({ ...address, country: 'United States' });
                  }}
                >
                  United States
                </p>
              </div>
            </div>
          </div>
          <div className='HalfLine'>
            <div className='HalfBox'>
              <p>Street Address</p>
              <input
                value={address.address}
                type='text'
                placeholder='House number and street name'
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
              />
            </div>
            <div className='HalfBox'>
              <p>Apartment, suite, unit, ect. (Optional)</p>
              <input
                value={address.appartment}
                type='text'
                placeholder='Optional'
                onChange={(e) => setAddress({ ...address, appartment: e.target.value })}
              />
            </div>
          </div>
          <div className='Line'>
            <p>Town / City</p>
            <input
              type='text'
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div className='Line'>
            {country === 'usa' ? <p>State</p> : <p>Province</p>}
            <div className='DropBox'>
              {address.province !== '' && <p>{address.province}</p>}
              {country === 'usa' ? (
                <div className='DropItems'>
                  {usaStates.map((state) => (
                    <p onClick={() => setAddress({ ...address, province: state.name })}>
                      {state.name}
                    </p>
                  ))}
                </div>
              ) : (
                <div className='DropItems'>
                  {provinces.map((province) => (
                    <p onClick={() => setAddress({ ...address, province: province.name })}>
                      {province.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='Line'>
            <p>Postal Code</p>
            <input
              value={address.postalCode}
              type='text'
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
          </div>
          <div className='Line'>
            <p>Phone</p>
            <input
              value={address.phone}
              type='text'
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />
          </div>
          <div className='Line'>
            <p>Email Address</p>
            <input
              value={address.email}
              type='text'
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
            />
          </div>
          <button onClick={() => dispatch(updateUserAddress(address))}>Save Address</button>
        </div>
        <div className='Payment'>
          {stripePromise && clientSecret && (
            <div>
              <h2>Purchase Total: ${intentAmount / 100}</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Payment />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
