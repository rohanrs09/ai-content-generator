import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Image from 'next/image';
import Link from 'next/link';

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className='group relative p-6 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-3xl border border-gray-300 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 ease-in-out transform flex flex-col items-start gap-4 cursor-pointer'>

        {/* Image with Glow and Hover Animation */}
        <div className='relative w-16 h-16 '>
          <Image
            src={item.icon}
            alt={item.name + ' icon'}
            width={64}
            height={64}
            className='object-cover '
          />
        </div>

        {/* Card Title with Subtle Gradient */}
        <h2 className='font-extrabold text-2xl bg-gradient-to-r from-gray-900 via-indigo-500 to-purple-500 bg-clip-text text-transparent group-hover:text-indigo-600 transition-all duration-500 ease-in-out'>
          {item.name}
        </h2>

        {/* Card Description */}
        <p className='text-gray-500 text-sm line-clamp-3'>
          {item.desc}
        </p>

        {/* Floating CTA Button on Hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all transform translate-y-4 duration-500">
          <button className='bg-indigo-600 text-white text-sm py-2 px-4 rounded-full shadow-lg hover:bg-indigo-500 transition-colors duration-300'>
            Explore
          </button>
        </div>

        {/* Decorative Gradient Border on Hover */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-500 ease-in-out"></div>
      </div>
    </Link>
  );
}

export default TemplateCard;
