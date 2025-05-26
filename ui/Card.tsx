import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;