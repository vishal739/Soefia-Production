// CurrentSummation.js
import React from 'react';
import Gauge from './Gauge';
import SentimentBarChart from './SentimentBarChart';

const sentimentData = [
  { name: 'Positive', value: 70 },
  { name: 'Negative', value: 10 },
];

const CurrentSummation = () => (
  <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '600px', margin: '0 auto', textAlign: 'center' }}>
    <h2>Current Summation</h2>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
      <div>
        <Gauge label="Subject" min={0} max={100} value={70} />
        <Gauge label="Social" min={0} max={100} value={30} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3>Sentiment</h3>
        <SentimentBarChart data={sentimentData} />
      </div>
    </div>
  </div>
);

export default CurrentSummation;
