import React, { useState } from 'react';
import { Icon, Tooltip, Input } from 'antd';

interface Props {
  node: {
    key: string,
    title: string,
    status?: string,
  }
  onDelete: (nodeKey: string) => void,
  onRename: (key: string, inputValue: string) => void,
  onFileAdd: (key: string) => void,
  onFolderAdd: (key: string) => void
}

export default function DirectoryActions({ node, onDelete, onRename, onFileAdd, onFolderAdd }: Props) {

  const [isFocusing, setIsFocusing] = useState(false);
  const [isEditing, setIsEditing] = useState(node.status === 'creating');
  const [inputValue, setInputValue] = useState(node.title);

  const enterHandler = () => {
    setIsFocusing(true);
  }

  const leaveHandler = () => {
    setIsFocusing(false);
  }

  const submitHandler = () => {
    setIsEditing(false);
    if (inputValue.length < 1) {
      if (node.status === 'creating') {
        onDelete(node.key);
      }
      return;
    }
    onRename(node.key, inputValue);
  }

  const Operations = () => {
    const handleDelete = (e: any) => {
      onDelete(node.key);
      e.stopPropagation();
    }

    const handleRename = (e: any) => {
      setIsEditing(true);
      e.stopPropagation();
    }

    const handleFileAdd = (e: any) => {
      e.stopPropagation();
      onFileAdd(node.key);
    }

    const handleFolderAdd = (e: any) => {
      e.stopPropagation();
      onFolderAdd(node.key);
    }

    return (
      <span style={{float: 'right'}}>
        <Tooltip title="重命名">
          <Icon type="edit" style={{marginRight: '10px'}} onClick={handleRename}></Icon>
        </Tooltip>
        <Tooltip title="新建文件">
          <Icon type="file-add" onClick={handleFileAdd} style={{marginRight: '10px'}}></Icon>
        </Tooltip>
        <Tooltip title="新建文件夹">
          <Icon type="folder-add" onClick={handleFolderAdd} style={{marginRight: '10px'}}></Icon>
        </Tooltip>
        <Tooltip title="删除文件">
          <Icon type="close" onClick={handleDelete}></Icon>
        </Tooltip>
      </span>
    )
  }

  const renderInput = () => {
    return (
      <Input autoFocus
        size="small"
        placeholder={node.title}
        onClick={(e) => {e.stopPropagation()}}
        onBlur={submitHandler}
        onPressEnter={submitHandler}
        onChange={(e) => {setInputValue(e.target.value)}}
      />
    )
  }

  return (
    <span
      style={{display: 'inline-block', width: '100%'}}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      { 
        isEditing ? renderInput() : node.title
      }
      {isFocusing && !isEditing && <Operations/>}
    </span>
  )
}
