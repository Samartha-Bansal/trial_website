import { client } from '@/sanity/lib/client'
import Ping from './Ping'
import { START_VIEW_QUERIES } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client';
import {after} from 'next/server'

const View = async ({id} : {id:string}) => {
    const {views: totalViews} = await client
    .withConfig({useCdn:false})
    .fetch(START_VIEW_QUERIES, {id});

    after( async () => 
      await writeClient
      .patch(id)
      .set({views: totalViews + 1})
      .commit());

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>

        <div className='view-text'>
            <span className='font-black'>{totalViews} views</span>
        </div>
    </div>
  )
};

export default View