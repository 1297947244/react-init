/**
 * 上传组件
 */
import React from 'react';
import { Upload, Button, message } from 'antd';
import styles from './index.scss';

interface UploaderProps {
  name?: string;
  size?: number;
  acceptType?: string;
  uploaderEnd?: () => void;
}

const LIMIT_SIZE = 20;
const UploadComponent: React.FC<UploaderProps> = ({ name, size, acceptType }) => {
  const props = {
    name: name,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload(file, fileList) {
      let type_valided = true;
      if (acceptType) {
        let name_arr = file.name.split('.');
        let suffix = name_arr[name_arr.length - 1];
        if (!acceptType.includes(suffix)) {
          message.error('文件类型只支持' + acceptType);
          type_valided = false;
        }
      }
      // 默认 20M
      const isLt20M = file.size / 1024 / 1024 < (size || LIMIT_SIZE);
      if (!isLt20M) {
        message.error(`File must smaller than ${size || LIMIT_SIZE}!`);
      }
      console.log(42, type_valided && isLt20M);
      return type_valided && isLt20M;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onSuccess(ret) {
      console.log('onSuccess', ret);
    },
    onError(err) {
      console.log('onError', err);
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`
    }
  };
  return (
    <div className={styles['upload-wrap']}>
      <Upload {...props}>
        <Button>Upload</Button>
      </Upload>
    </div>
  );
};

export default React.memo(UploadComponent);
