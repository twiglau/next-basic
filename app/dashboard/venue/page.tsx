"use client";

import React from "react";
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { addVenus, getStates } from '@/utils/actions';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const VenuePage = () => {
    const [state, action, isPending] = React.useActionState(addVenus, null);
    const [states, setStates] = React.useState<Array<{ id: string; name: string; code: string }>>([]);
    const [selectedStateId, setSelectedStateId] = React.useState<string>("");

    React.useEffect(() => {
        getStates().then(setStates);
    }, []);

    return (
        <div className="">
            <form className="flex flex-col gap-3 max-w-md mx-auto" action={action}>
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
                    <Select value={selectedStateId} name="stateId" onValueChange={setSelectedStateId}>
                        <SelectTrigger>
                            <SelectValue placeholder="请选择州" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {states.map((state) => (
                                    <SelectItem key={state.id} value={state.id}>
                                        {state.name} ({state.code})
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* Hidden input to submit the selected state ID */}
                    {/* <input type="hidden" name="stateId" value={selectedStateId} /> */}
                </Field>
                <Button className="w-full mt-5" type='submit' disabled={isPending}>
                    {isPending ? '提交中...' : '提交'}
                </Button>
                <FieldError>{state?.message}</FieldError>
            </form>
        </div>
    );
};

export default VenuePage;   