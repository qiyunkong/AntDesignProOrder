import React,{useState,useEffect} from 'react';
import { Tag, Input, Tooltip,Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const  EditableTagGroup = (props:{
  name:string,
}) => {
  /** 输入框输入的内容 */
  const [inputValue,setInputValue] = useState<string>();
  /** 输入框输入的内容 */
  const [input,setInput] = useState<Input>();
  /** 修改框的输入内容 */
  const [editInput,setEditInput] = useState<Input>();
  const [editInputValue,setEditInputValue] = useState<string>('');
  /** 设置输入框的状态 */
  const [inputVisible,setInputVisible] =  useState<boolean>(false);
  /** 输入的索引值 */
  const [editInputIndex,setEditInputIndex] =  useState<number>(-1);
  /** */
  const [tags,setTags] =  useState<string[]>(['香辣', '麻辣', '微辣']);

  /** 钩子函数 */
  useEffect(()=>{
    input?.focus?.()
    editInput?.focus();
  },[inputValue])

  const handleClose = (removedTag:any) => {
    const _tags = tags.filter((tag:any) => tag !== removedTag);
    console.log(tags);
    setTags([
      ..._tags
    ]);
  };

  const showInput = () => {
    //() => this.input.focus()
    setInputVisible(true );
  };

  const handleInputChange = (e:any) => {
    setInputValue( e.target.value);
  };

  const handleInputConfirm = () => {
    let _tags = tags;
    if (inputValue && _tags.indexOf(inputValue) === -1) {
      _tags = [..._tags, inputValue];
    }
    console.log(_tags);
    setTags(_tags)
    setInputValue('')
    setInputVisible(false)
  };

  const  handleEditInputChange = (e:any) => {
    setEditInputValue(e.target.value)
  };

  const handleEditInputConfirm = () => {
      const _tags = [...tags];
      _tags[editInputIndex] = editInputValue;
      setTags(_tags)
      setEditInputIndex(-1)
      setEditInputValue('')
      setInputVisible(false)

  };

  const saveInputRef = (inputRef:any) => {
    setInput(inputRef);
  };

  const saveEditInputRef = (inputRef:any)=> {
     setEditInput(inputRef);
  };
  return (
    <>
      <Form.Item>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  setEditInputIndex(index)
                  setEditInputValue(tag)
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Form.Item>
          <Input
            ref={saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        </Form.Item>
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 添加
        </Tag>
      )}
      </Form.Item>
    </>
  );

}

export default EditableTagGroup
