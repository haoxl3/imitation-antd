import React, {FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef} from 'react';
import classNames from 'classnames';
import Input, {InputProps} from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

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
    const [highlightIndex, sethighlightIndex] = useState(-1);
    const triggerSearch = useRef(false); // 记录搜索框是否是填写的内容，以此限制按回车键时不用再搜索
    const componentRef = useRef<HTMLDivElement>(null); // 点击页面非select框时让其收起,因为input最外层是div
    const debouncedValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, () => {setSuggestions([])}); // 点面页面空白处关闭select

    // 当input的值有变化时去异步请求
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
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
        sethighlightIndex(-1);
    }, [debouncedValue])

    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        sethighlightIndex(index);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38: // 向上箭头
                highlight(highlightIndex - 1);
                break;
            case 40: // 向下箭头
                highlight(highlightIndex + 1);
                break;
            case 27: // esc键
                setSuggestions([]);
                break;
            default:
                break;
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }
    
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }
    const generateDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    });
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {loading && <ul><Icon icon='spinner' spin/></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete;