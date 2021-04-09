import React from 'react';

function Svg() {
  return (
    <svg
      width="339"
      height="229"
      viewBox="0 0 339 229"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.733398"
        y="0.472412"
        width="338"
        height="228.478"
        rx="20"
        fill="#D1E2F8"
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="339"
        height="229"
      >
        <rect
          x="0.733398"
          y="0.472412"
          width="338"
          height="228.478"
          rx="20"
          fill="#D1E2F8"
        />
      </mask>
      <g mask="url(#mask0)">
        <g filter="url(#filter0_d)">
          <rect
            x="76.8682"
            y="29.6266"
            width="185.731"
            height="398.648"
            rx="18"
            fill="url(#pattern0)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="26.8682"
          y="-16.3734"
          width="285.731"
          height="498.648"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.192157 0 0 0 0 0.4 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(0 -0.004415) scale(0.000666667 0.0003106)"
          />
        </pattern>
        <image
          id="image0"
          width="1500"
          height="3248"
        />
      </defs>
    </svg>
  );
}

export default Svg;