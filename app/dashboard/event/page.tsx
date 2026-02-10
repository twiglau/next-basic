"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { addVenus } from '@/utils/actions';


const EventPage = () => {
    const [state, action, isPending] = React.useActionState(addVenus, null);
    return (
        <div>
            <form className="flex flex-col gap-3" action={action}>
                <Field>
                    <FieldLabel>名称</FieldLabel>
                    <Input name='name' />
                </Field>
                <Field>
                    <FieldLabel>地址</FieldLabel>
                    <Input name='address' />
                </Field>
                <Field>
                    <FieldLabel>州</FieldLabel>
                    <Input name='stateId' />
                </Field>
                <Button className="w-full mt-5" type='submit' disabled={isPending}>
                    {isPending ? '提交中...' : '提交'}
                </Button>
                <FieldError>{state?.message}</FieldError>
            </form>
        </div>
    );
};

export default EventPage;   