import React, {ChangeEvent, FC, useRef, useState} from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Button from '../Button/button';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}

export const Upload: FC = (props) => {
    const {action, defaultFileList, onProgress,
        beforeUpload, onSuccess, onError, onChange,
        onRemove, headers, name, data, withCredentials,
        accept, multiple, drag, children
    } = props;
    // 保存文件数量，进度条要用
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const fileInput = useRef(null);

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj};// 替换
                } else {
                    return file;
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid);
        })
        if (onRemove) {
            onRemove(file);
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                }
            }
        });
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // 将当前文件放最前面
        // setFileList([_file, ...fileList]);
        setFileList(prevList => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: e => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(resp => {
            updateFileList(_file, {status: 'success', response: resp.data});
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(err => {
            updateFileList(_file, {status: 'error', error: err});
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
    }
    return (
        <div className="viking-upload-component">
            {/* <Button btnType="primary" onClick={handleClick}>upload file</Button> */}
            <div
                className="viking-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                {drag ?
                    <Dragger onFile={files => {uploadFiles(files)}}>{children}</Dragger>
                    :
                    children
                }
                <input
                    className="viking-file-input"
                    style={{display: 'none'}}
                    ref={fileInput}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    );
}
Upload.defaultProps = {
    name: 'file'
}
export default Upload;
