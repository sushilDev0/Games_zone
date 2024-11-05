import { FC, ReactNode } from 'react'

interface ButtonProps {
  image: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ image, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer m-3 bg-zinc-300 hover:bg-sky-200 rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center transition-all duration-300"
    >
      {typeof image === 'string' ? (
        <img
          src={image}
          alt="selection"
          className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
        />
      ) : (
        image // Render the React component (icon) directly with responsive sizes
      )}
    </button>
  );
}

export default Button;
