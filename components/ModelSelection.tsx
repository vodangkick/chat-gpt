'use client'

import Select from 'react-select';
import useSWR from 'swr';

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());



function ModelSelection() {
    const { data: models, isLoading } = useSWR("models", fetchModels);
    const { data: model, mutate: setModel } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    });

    //console.log(models.modelOptions);

    return (
        <div>
            <Select
                className="mt-2"
                options={models?.modelOptions}
                defaultValue={model}
                isSearchable
                isLoading={isLoading}
                menuPosition="fixed"
                instanceId="long-value-select"
                classNames={{
                    control:(state) => "bg-[#434654] border-[434654]"
                }}
                placeholder={model}
                onChange = {(e) => setModel(e.value)}

            />
        </div>
    )
}

export default ModelSelection
