// import React from 'react'
// import { Button } from './ui/button'

// const LinkdinInfo = () => {
//   return (
//     <div className='mt-10 mb-10'>
//       <input
//         type="url"
//         placeholder="Enter your LinkedIn URL"
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//         />

//         <Button variant="outline">Connect</Button>
//     </div>
//   )
// }

// export default LinkdinInfo


'use client';

import { useState } from 'react';
import { Button } from './ui/button';

const LinkdinInfo = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchLinkedInData = async () => {
    if (!linkedinUrl) {
      alert('Please enter your LinkedIn URL');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/linkdin-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedinUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('LinkedIn Data:', data);
        alert('Profile fetched! Check console.');
      } else {
        console.error('Error:', data);
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-10 mb-10'>
      <input
        type="url"
        value={linkedinUrl}
        onChange={(e) => setLinkedinUrl(e.target.value)}
        placeholder="Enter your LinkedIn URL"
        className="w-full p-2 border border-gray-300 text-black rounded mb-4"
      />

      <Button variant="outline" onClick={handleFetchLinkedInData} disabled={loading}>
        {loading ? 'Fetching...' : 'Connect'}
      </Button>
    </div>
  );
};

export default LinkdinInfo;
