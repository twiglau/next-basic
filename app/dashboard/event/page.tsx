"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { VenueActionType, getVenus } from '@/utils/actions';
import { useFormik } from "formik"
import {  EventsType } from "@/server/db/models/events";
import * as Yup from "yup";
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectGroup, 
    SelectItem 
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { addEvent } from "@/utils/actions";
import { Spinner } from "@/components/ui/spinner";


const EventPage = () => {
    const [ isPending, startTransition ] = React.useTransition();
    const [ venues, setVenues ] = React.useState<Array<VenueActionType>>([]);
    const [ open, setOpen ] = React.useState(false);
    const [ date, setDate ] = React.useState<Date | undefined>(new Date());
    const [ dateTime, setDateTime ] = React.useState<string>("09:00:00");
    const [ error, setError ] = React.useState<string|null>(null);


    const formik = useFormik<Omit<EventsType, "createdAt"|"updatedAt">>({
        initialValues: {
           artist: "",
           date: "",
           description: "",
           venueId: "",
           slug: "",
        },
        validationSchema: Yup.object({
            artist: Yup.string().required("Artist is required"),
            date: Yup.date().required("Date is required"),
            description: Yup.string().required("Description is required"),
            venueId: Yup.string().required("Venue is required"),
            slug: Yup.string().required("Slug is required"),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const { setFieldValue } = formik;


    React.useEffect(() => {
        getVenus().then(setVenues);
    }, []);

    React.useEffect(() => {
        if (date && dateTime) {
            const formattedDate = format(date, "yyyy-MM-dd");
            const formattedDateTime = `${formattedDate} ${dateTime}`;
            setFieldValue("date", formattedDateTime, false);
        }
    }, [date, dateTime, setFieldValue]);


    const handleSubmit = async (values: Omit<EventsType, "createdAt"|"updatedAt">) => {
        startTransition(() => {
            // 提交信息
            addEvent(values).then((res) => {
                if (res.success) {
                    formik.resetForm();
                    setError(null);
                } else {
                    setError(res.message);
                }
            })  
        })
    }
    return (
        <div>
            <form className="flex flex-col gap-3 max-w-md mx-auto" onSubmit={formik.handleSubmit}>
                <Field>
                    <FieldLabel>艺术家</FieldLabel>
                    <Input {...formik.getFieldProps("artist")} placeholder="请输入艺术家" />
                    {formik.touched.artist && formik.errors.artist ? (
                      <FieldError>{formik.errors.artist}</FieldError>
                    ) : null}
                </Field>
                <Field>
                    <FieldLabel>活动描述</FieldLabel>
                    <Input {...formik.getFieldProps("description")} placeholder="请输入活动描述" />
                    {formik.touched.description && formik.errors.description ? (
                      <FieldError>{formik.errors.description}</FieldError>
                    ) : null}
                </Field>
                <Field>
                    <FieldLabel>场馆</FieldLabel>
                    <Select 
                    value={formik.values.venueId} 
                    onValueChange={(value) => formik.setFieldValue("venueId", value)} 
                    name="venueId">
                        <SelectTrigger>
                            <SelectValue placeholder="请选择场馆" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {venues.map((venue) => (    
                                    <SelectItem key={venue.id} value={venue.id}>
                                        <span>{venue.name}</span>
                                        <span className="text-xs text-muted-foreground">{venue.address}</span>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {formik.touched.venueId && formik.errors.venueId ? (
                      <FieldError>{formik.errors.venueId}</FieldError>
                    ) : null}
                </Field>
                <Field>
                    <FieldLabel>Slug (唯一标识)</FieldLabel>
                    <Input {...formik.getFieldProps("slug")} placeholder="例如: my-awesome-event" />
                    {formik.touched.slug && formik.errors.slug ? (
                      <FieldError>{formik.errors.slug}</FieldError>
                    ) : null}
                </Field>
                <FieldGroup className="mx-auto w-full flex-row">
                    <Field>
                        <FieldLabel htmlFor="date-picker-optional">日期</FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                type="button"
                                variant="outline"
                                id="date-picker-optional"
                                className="w-32 justify-between font-normal"
                                >
                                    {date ? format(date, "PPP") : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                defaultMonth={date}
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                                />
                            </PopoverContent>
                        </Popover>
                    </Field>
                    <Field className="w-32">
                        <FieldLabel htmlFor="time-picker-optional">具体时间</FieldLabel>
                        <Input
                            type="time"
                            id="time-picker-optional"
                            step="1"
                            value={dateTime}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                    </Field>
                </FieldGroup>
                <Button className="w-full mt-5" type='submit' disabled={isPending}>
                    { isPending? <Spinner /> : null  }
                    { isPending ? '提交中...' : '提交' }
                </Button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default EventPage;   