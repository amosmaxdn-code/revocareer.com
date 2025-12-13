import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImageUrl?: string;
};

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorImageUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 relative h-full flex flex-col">
      <FaQuoteLeft className="absolute top-4 left-4 text-primary/10 text-6xl" />
      <div className="relative z-10 flex-grow">
        <p className="text-gray-600 italic">"{quote}"</p>
      </div>
      <div className="mt-6 flex items-center">
        {authorImageUrl && (
          <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
            <Image
              src={authorImageUrl}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-bold text-dark-blue">{authorName}</p>
          <p className="text-sm text-gray-500">{authorRole}</p>
        </div>
      </div>
    </div>
  );
}
