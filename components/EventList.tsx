"use client";

import Masonry from 'react-masonry-css';
import { CardAction, CardFooter } from './ui/card';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { Badge } from './ui/badge';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const randomHeight = (index: number) => {
    const heights = [200, 300];
    return heights[index % heights.length];
}


const EventListComponent = ({events}: {events: any[]}) => {
    return (
        <div className='max-w-5xl mx-auto mt-4 p-5'>
            <h1 className='text-5xl py-3 font-anton'>Events</h1>
            <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
                {events.map((event, index) => (
                    <Card key={event.id} className="relative overflow-hidden mx-auto w-full max-w-sm pt-0" style={{height: randomHeight(index)}}>
                        <Image
                            src={`https://picsum.photos/200/${randomHeight(index)}?${index}`}
                            alt="Event cover"
                            fill
                            className="inset-0 object-cover hover:scale-110 transition duration-300"
                        />
                        <CardHeader className='absolute top-0 left-0 right-0 z-10 bg-black/50 py-3 flex items-center justify-between'>   
                            <p className='text-white'>{event.artist}</p> 
                            <Badge variant="outline" className='text-white bg-transparent border-white'>{event.date}</Badge>
                        </CardHeader>
                        <CardFooter className='absolute bottom-0 left-0 right-0 z-10 py-3 bg-black/50'>
                            <Button variant="outline">View Event</Button>
                        </CardFooter>
                    </Card>
                ))}
            </Masonry>
        </div>
    );
};

export default EventListComponent;
