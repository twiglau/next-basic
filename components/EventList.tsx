"use client";

import Masonry from 'react-masonry-css';
import { format } from 'date-fns';
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



const EventListComponent = ({events}: {events: any[]}) => {
    return (
        <div className='max-w-5xl mx-auto mt-4 p-5'>
            <h1 className='text-5xl py-3 font-anton'>Events</h1>
            <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
                {events.map((event) => (
                    <Card key={event.id} className="relative mx-auto w-full max-w-sm pt-0">
                        <div className='relative'>
                            <Image
                                src={`https://picsum.photos/200/300`}
                                alt="Event cover"
                                className="object-cover hover:scale-110 transition duration-300"
                                width={200}
                                height={300}
                            />
                        </div>
                        <CardHeader>    
                            <CardAction>
                                <Badge variant="outline">{format(new Date(event.date), 'MMM dd, yyyy')}</Badge>
                            </CardAction>
                            <CardTitle>{event.venue.name}</CardTitle>
                            <CardDescription>
                               {event.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full">View Event</Button>
                        </CardFooter>
                    </Card>
                ))}
            </Masonry>
        </div>
    );
};

export default EventListComponent;
