import Link from 'next/link';
import { useState } from 'react';

interface LinkCardProps {
  title: string;
  url: string;
  imageUrl?: string | null;
}

export default function LinkCard({ title, url, imageUrl }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-4 flex items-center justify-between">
        {/* Left side with image and title */}
        <div className="flex items-center pr-4 max-w-[calc(100%-140px)]">
          {imageUrl && (
            <div className="flex-shrink-0 h-10 w-10 mr-3">
              <img
                src={imageUrl}
                alt={title}
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-medium text-charcoal break-words">
              {title}
            </h3>
          </div>
        </div>

        {/* Right side with buttons - fixed width, vertically centered */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Link
            href={url}
            target="_blank"
            className="inline-flex items-center px-3 py-1.5 bg-pistachio hover:bg-olive text-white rounded-md transition-colors whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Visit
          </Link>

          <button
            onClick={copyToClipboard}
            className="inline-flex items-center px-3 py-1.5 bg-peach hover:bg-persimmon text-white rounded-md transition-colors whitespace-nowrap"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
