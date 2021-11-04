import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {AutoComplete, DataSourceType} from './autoComplete';

interface LakerPlayerProps {
    value: string;
    number: number;
}
const SimpleComplete = () => {
    const lakers = [
        {value: 'bradley', number: 11},
        {value: 'pope', number: 1},
        {value: 'caruso', number: 4},
        {value: 'cook', number: 2},
        {value: 'cousins', number: 15},
        {value: 'james', number: 23},
        {value: 'AD', number: 3},
        {value: 'green', number: 14},
        {value: 'howard', number: 39},
        {value: 'kuzma', number: 0},
    ];
    // 支持纯字符串数组
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
    // }
    // 支持对象数组
    const handleFetch = (query: string) => {
        return lakers.filter(player => player.value.includes(query));
    }
    const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
        return (
            <>
                <h2>Name: {item.value}</h2>
                <p>Number: {item.number}</p>
            </>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
        />
    );
}
storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)