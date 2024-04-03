import { type ReactNode } from 'react';

export type Props = {
  heading: string;
  content: ReactNode;
};

export default function MovieDetailItem({ heading, content }: Props) {
  return (
    <div>
      <h3 className="text-large font-bold">{heading}</h3>
      {typeof content === 'string' ? <h3>{content}</h3> : content}
    </div>
  );
}
