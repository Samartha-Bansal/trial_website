import { client } from '@/sanity/lib/client';
import { START_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import Card, { CardType } from './StartCard';

const UserStart = async ({id} : {id: string}) => {
    const starts = await client.fetch(START_BY_AUTHOR_QUERY, {id});
  return (
    <>
      {starts.length > 0 ? (starts.map((start: CardType) => (
        <Card key={start._id} post={start}/>
      ))
    ) : (
        <p className='no-result'>No posts yet</p>
      )}
    </>
  );
};

export default UserStart