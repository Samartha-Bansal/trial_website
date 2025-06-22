import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client';
import { PLAYLIST_QUERY, START_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { formalDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import Card, { CardType } from '@/components/StartCard';

const md = markdownit();

const page = async ({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    const [post, {select: choosenPost}] = await Promise.all([
        client.fetch(START_BY_ID, {id}),
        client.fetch(PLAYLIST_QUERY, {slug: 'read-my-posts'}),
    ])

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');

  return (
    <>
    <section className='pink_container !min-h-[256px]'>
        <p className='tag'>{formalDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
    </section>

    <section className='section-container'>
        <img src={post.image} alt="thumbnail" className='mt-10 w-4xl h-auto mx-auto rounded-xl' />

        <div className='space-y-5 mt-10 mx-auto max-w-4xl items-center flex flex-col w-full'>
            <div className='flex-between w-full'>
                <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                    <Image src={post.author?.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg'/>

                    <div>
                        <p className='text-20-medium'>{post.author.name}</p>
                        <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
                    </div>
                </Link>

                <p className='category-tag'>{post.category}</p>
            </div>

            <h3 className='text-30-bold'>Pitch Details</h3>
            {parsedContent ? (
                <article dangerouslySetInnerHTML={{ __html: parsedContent}} className='prose font-work-sans max-w-4xl'/>
                ) : (
                    <p className='no-result'>No details provided</p>
                )}
        </div>
        <hr className='divider' />

        {choosenPost?.length > 0 && (
            <div className='max-w-4xl mx-auto'>
                <p className='text-30-semibold'>Picks</p>

                <ul className='mt-7 card_grid-sm'>
                    {choosenPost.map((post: CardType, i: number) => (
                        <Card key={i} post={post}/>
                    ))}
                </ul>
            </div>
        )}

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
            <View id = {id}/>
        </Suspense>
    </section>
    </>
  )
}

export default page