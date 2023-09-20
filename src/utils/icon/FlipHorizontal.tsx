export const FlipHorizontal = ({ props }: any) => {
  return (
    <svg
      data-testid='flipHorizontalIcon'
      className='rotate-90'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <g>
        <g stroke='none' fill='currentColor'>
          <path d='M11.93 7.007V20a1 1 0 0 1-1 1H5.78a1 1 0 0 1-.93-1.368l5.15-12.993a1 1 0 0 1 1.929.368z'></path>
          <path
            d='M14 7.007V20a1 1 0 0 0 1 1h5.149a1 1 0 0 0 .93-1.368l-5.15-12.993A1 1 0 0 0 14 7.007z'
            opacity='.6'></path>
        </g>
      </g>
    </svg>
  );
};
