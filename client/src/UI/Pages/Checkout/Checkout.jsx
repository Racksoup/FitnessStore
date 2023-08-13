import React, { useState } from 'react';
import './Checkout.scss';
import { selectCheckout } from '../../../Redux/cartSlice';

import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const checkout = useSelector(selectCheckout);
  const [country, setCountry] = useState('');
  const [billing, setBilling] = useState({
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

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    appartment: '',
    city: '',
    province: '',
    postalCode: '',
  });

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

  // const stripePromise = loadStripe(process.env.STRIPE_KEY);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }
  // };

  return (
    <div className='Checkout'>
      <h1>Checkout</h1>
      <div className='Content'>
        <div className='Billing'>
          <h3>Billing</h3>
          <div className='HalfLine'>
            <div className='HalfBox'>
              <p>First name</p>
              <input
                type='text'
                onChange={(e) => setBilling({ ...billing, firstName: e.target.value })}
              />
            </div>
            <div className='HalfBox'>
              <p>Last name</p>
              <input
                type='text'
                onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className='Line'>
            <p>Country / Region</p>
            <div className='DropBox'>
              {billing.country !== '' && <p>{billing.country}</p>}
              <div className='DropItems'>
                <p
                  onClick={() => {
                    setCountry('canada');
                    setBilling({ ...billing, country: 'Canada' });
                  }}
                >
                  Canada
                </p>
                <p
                  onClick={() => {
                    setCountry('usa');
                    setBilling({ ...billing, country: 'United States' });
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
                type='text'
                placeholder='House number and street name'
                onChange={(e) => setBilling({ ...billing, address: e.target.value })}
              />
            </div>
            <div className='HalfBox'>
              <p>Apartment, suite, unit, ect. (Optional)</p>
              <input
                type='text'
                placeholder='Optional'
                onChange={(e) => setBilling({ ...billing, appartment: e.target.value })}
              />
            </div>
          </div>
          <div className='Line'>
            <p>Town / City</p>
            <input type='text' onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
          </div>
          <div className='Line'>
            {country === 'usa' ? <p>State</p> : <p>Province</p>}
            <div className='DropBox'>
              {billing.province !== '' && <p>{billing.province}</p>}
              {country === 'usa' ? (
                <div className='DropItems'>
                  {usaStates.map((state) => (
                    <p onClick={() => setBilling({ ...billing, province: state.name })}>
                      {state.name}
                    </p>
                  ))}
                </div>
              ) : (
                <div className='DropItems'>
                  {provinces.map((province) => (
                    <p onClick={() => setBilling({ ...billing, province: province.name })}>
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
              type='text'
              onChange={(e) => setBilling({ ...billing, postalCode: e.target.value })}
            />
          </div>
          <div className='Line'>
            <p>Phone</p>
            <input
              type='text'
              onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
            />
          </div>
          <div className='Line'>
            <p>Email Address</p>
            <input
              type='text'
              onChange={(e) => setBilling({ ...billing, email: e.target.value })}
            />
          </div>
        </div>
        <div className='Payment'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Elements stripe={stripePromise}>
              <CardElement />
            </Elements>
            <button className='Btn' type='submit'>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
