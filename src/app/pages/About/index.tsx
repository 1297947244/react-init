import React, { useState } from 'react';
import styles from './index.scss';
import UploadComponent from 'app/components/Uploader';

const About: React.FC = () => {
  const [name, setName] = useState<number>(100);

  // useEffect(() => {}, []);
  const uploaderEnd = () => {
    console.log('上传结束');
  };
  return (
    <>
      <div className={styles.center}>
        关于我们2222{name}
        <button
          className={styles.btn}
          onClick={() => {
            setName(name + 1);
          }}
        >
          修改名称
        </button>
        <img src={require('../../commons/imgs/monkey.jpg')} />
        <div className={styles.monkey}></div>
      </div>
      <UploadComponent name="hello" acceptType="txt,png,html" size={2} uploaderEnd={() => uploaderEnd()} />
    </>
  );
};

export default React.memo(About);
