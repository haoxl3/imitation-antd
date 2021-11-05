import React, {FC, useState, ChangeEvent, ReactElement, useEffect} from 'react';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';

// 定义传的option默认有value属性
interface DataSourceObject {
    value: string;
}
// 定义泛型与DataSourceObject交叉
export type DataSourceType<T ={}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>; // promise指定异步获取的值
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props;
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(inputValue, 500);

    // 当input的值有变化时去异步请求
    useEffect(() => {
        if (debouncedValue) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    // setLoading(false);
                    setSuggestions(data);
                });
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
    }
    
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            />
            {loading && <ul><Icon icon='spinner' spin/></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete;