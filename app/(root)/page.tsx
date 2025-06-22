import { START_QUERY } from '@/sanity/lib/queries';
import SearchForm from '../../components/SearchForm'
import Card, { CardType } from '@/components/StartCard';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';

export default async function page ( {searchParams} : {searchParams: Promise<{query?: string}>} )  {
  const query = (await searchParams).query;
  const params = {search: query || null};

  const session = await auth();

  const {data: posts} = await sanityFetch({query: START_QUERY, params});

  return (
    <>
    <div className='pink_container'>
      <p className='heading'>Press Start</p>
      <p className='sub-heading'>I hope to God that this works.</p>
      <SearchForm query={query}/>
    </div>

    <section className='section-container py-10'>
      <p className='text-30-semibold'>
        {query ? `Search results for "${query}"` : 'All stuffs'}
      </p>

      <ul className='mt-1 card_grid'>
        {posts?.length > 0 ? (
          posts.map((post: CardType) => (
            <Card key={post?._id} post={post}/>
          ))
        ) : (
          <p className='no-results'>No results</p>
        )}
      </ul>
    </section>

    <SanityLive />
    </>
  )
}

 