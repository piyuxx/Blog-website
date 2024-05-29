import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        {console.log(listing.imageUrls)}
        <img
          src={
            listing.imageUrls[0] ||
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Ffruit%2F&psig=AOvVaw22qzYFXJk-PNAyhN4n7mAz&ust=1717103153442000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPC6jK3is4YDFQAAAAAdAAAAABAE'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <h1>{listing.name}</h1>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
        </div>
      </Link>
    </div>
  );
}