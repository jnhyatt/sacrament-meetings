import { ImageResponse } from 'next/og';

export const alt = 'Mountain Point 6th Ward';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #23375e, #11141b)',
      }}
    >
      <svg width="320" height="320" viewBox="0 0 32 32">
        <path
          fill="#ffffff"
          fillRule="evenodd"
          d="M16 1 18 9v5.3l9 5.7v11H5V20l9-5.7V9ZM14 31v-5a2 2 0 0 1 4 0v5Z"
        />
      </svg>
    </div>,
    size
  );
}
