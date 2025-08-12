import Link from "next/link";
import Image from "next/image";
import { TEMPLATE } from "./TemplateListSection";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className='group relative p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-card to-muted shadow-xl hover:shadow-2xl rounded-2xl border border-border hover:border-primary/30 hover:scale-[1.02] transition-all duration-500 ease-in-out transform flex flex-col items-start gap-3 h-full cursor-pointer'>
        {/* Category Badge - More compact for 4-column layout */}
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-primary/10 text-primary border-none text-[10px] py-1 px-2 rounded-full">
            {item.category}
          </span>
        </div>
        
        {/* Image with Glow and Hover Animation */}
        <div className='relative w-12 h-12 sm:w-14 sm:h-14'>
          <Image
            src={item.icon}
            alt={item.name + ' icon'}
            width={56}
            height={56}
            className='object-cover'
          />
          
          {/* Add subtle glow effect on hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
        </div>
        
        {/* Card Title with Subtle Gradient - Slightly smaller for 4-column layout */}
        <h2 className='font-bold text-xl bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent group-hover:text-primary transition-all duration-500 ease-in-out line-clamp-1'>
          {item.name}
        </h2>
        
        {/* Card Description */}
        <p className='text-muted-foreground text-sm line-clamp-2'>
          {item.desc}
        </p>
        
        {/* Floating CTA Button on Hover - Smaller for better fit */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all transform translate-y-4 duration-500">
          <button className='bg-primary text-primary-foreground text-xs py-1.5 px-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-300'>
            Explore
          </button>
        </div>
        
        {/* Decorative Gradient Border on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500 ease-in-out"></div>
      </div>
    </Link>
  );
}

export default TemplateCard;