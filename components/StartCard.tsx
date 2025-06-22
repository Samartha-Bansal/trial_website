import { cn, formalDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Start, Author } from '@/sanity/types'
import { Skeleton } from './ui/skeleton'

export type CardType = Omit <Start, "author"> & {author?: Author};

const Card = ({post} : {post: CardType}) => {
  const {_createdAt, views, author, title, category, _id, image, description} = post;

  return (
    <li className='start-card group shadow-200 hover:shadow-300'>
      <div className='flex-between'>
        <p className='start-card-date'>
          {formalDate(_createdAt)}
        </p>

        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>

          <Link href={`/start/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full'/>
        </Link>
      </div>

      <Link href={`/start/${_id}`}>
        <p className='start-card_desc'>{description}</p>
        <img src={image} alt="placeholder" className='start-card_img' style={{ objectPosition: '50% 75%' }} />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium font-bold'>{category}</p>
        </Link>

        <button className='start-card_btn'>
          <Link href={`../start/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  )
}

export const CardSkeleton = () => {
  return (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}>
        <Skeleton className='start-card_skeleton'/>
      </li>
    ))}
  </>
  );
};

export default Card;