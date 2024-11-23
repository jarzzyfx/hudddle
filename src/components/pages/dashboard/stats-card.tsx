import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import ProgressBar from '@/components/shared/progress-bar';
import { StatsCardProps } from '@/lib/@types';

const StatsCard: React.FC<StatsCardProps> = ({ image, title, description, progressValue, progressColor }) => {
  return (
    <Card className='border-none p-4 rounded-md space-y-5 neo-effect'>
      <CardContent className='p-0 flex gap-2'>
        <Image src={image} alt={title} width={30} height={30} />
        <div>
          <CardTitle className='text-custom-semiBlack text-xl'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardContent>
      <div className='rounded-full bg-[#D9D9D9] w-[80%]'>
        <ProgressBar className='h-10 rounded-full' progressValue={progressValue} progressColor={progressColor} />
      </div>
    </Card>
  );
};

export default StatsCard;
