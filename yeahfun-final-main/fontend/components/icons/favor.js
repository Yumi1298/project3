import { MdStars } from 'react-icons/md'

export default function Favor({ width }) {
  return (
    <>
      <div className="favor" role="button" tabIndex={0}>
        <svg
          width={width}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="21.8999"
            cy="21.8999"
            r="21.3999"
            fill="white"
            stroke="#FDAF17"
          />
          <path
            d="M23.2042 11.7554C22.9833 11.2938 22.5167 11 22.0042 11C21.4917 11 21.0292 11.2938 20.8042 11.7554L18.125 17.3073L12.1417 18.197C11.6417 18.2725 11.225 18.625 11.0708 19.1076C10.9167 19.5902 11.0417 20.1231 11.4 20.4798L15.7417 24.8064L14.7167 30.9207C14.6333 31.4243 14.8417 31.9362 15.2542 32.2342C15.6667 32.5321 16.2125 32.5699 16.6625 32.3307L22.0083 29.4561L27.3542 32.3307C27.8042 32.5699 28.35 32.5363 28.7625 32.2342C29.175 31.932 29.3833 31.4243 29.3 30.9207L28.2708 24.8064L32.6125 20.4798C32.9708 20.1231 33.1 19.5902 32.9417 19.1076C32.7833 18.625 32.3708 18.2725 31.8708 18.197L25.8833 17.3073L23.2042 11.7554Z"
            fill="#FDAF17"
          />
        </svg>
      </div>
      {/* <style jsx>{`
        .favor {
          color: #feaf18;
        }
      `}</style> */}
    </>
  )
}
