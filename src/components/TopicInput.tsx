import React from 'react';
import styled from 'styled-components';
import { FormControl, InputLabel, Select, Input, MenuItem, Chip } from '@material-ui/core';

const topics = [
    'Ecotourism',
    'Ecology research',
    'Wildlife research',
    'Counter-trafficking'
];

const TopicInputDiv = styled.div`
    margin-bottom: 10px;
`;

const TopicInput = () => {
    const [topicName, setTopicName] = React.useState<string[]>([]);

    const handleChange = (e: any) => {
        setTopicName(e.target.value as string[]);
    };

    return (
        <TopicInputDiv>
            <FormControl fullWidth>
                <InputLabel id="mutiple-chip-label">Topics</InputLabel>
                <Select
                    autoWidth
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    multiple
                    value={topicName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                        <div>
                            {(selected as string[]).map(value => (
                                <Chip style={{ margin: '5px' }} key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    {topics.map(topic => (
                        <MenuItem key={topic} value={topic}>
                            {topic}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </TopicInputDiv>
    )
}

export default TopicInput;