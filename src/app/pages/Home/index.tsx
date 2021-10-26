import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Carousel } from 'antd';
import { RootState } from 'app/reducers';
import { getArticleList } from 'app/utils/fetch';
import styles from './style.scss';

const Home = () => {
  const dispatch = useDispatch();
  // const [list, setList] = useState<InfoListType[]>([]);
  const { showMenu } = useSelector((state: RootState) => state.ui_status);
  const { infoList } = useSelector((state: RootState) => state.home);
  useEffect(() => {
    // test 发送 dispatch
    setTimeout(() => {
      dispatch({
        type: 'UI_SHOW_MENU',
        payload: { showMenu: !showMenu }
      });
    }, 3000);
    getArticleList({ workType: 2 }).then((res: any) => {
      // setList(res.items);
      dispatch({
        type: 'HOME_SET_INFO_LIST',
        payload: { infoList: res.items }
      });
    });
  }, []);

  // 图片轮播

  return (
    <div className={styles.normal}>
      <h3 className={styles.title}>你好-{showMenu ? 'true' : 'false'}</h3>
      {infoList[0] && infoList[0].workName}
      <Button type="primary" danger>
        提交
      </Button>
      <Carousel autoplay={false}>
        <div>
          <h3 className={styles.car_head}>1</h3>
        </div>
        <div>
          <h3 className={styles.car_head}>2</h3>
        </div>
        <div>
          <h3 className={styles.car_head}>3</h3>
        </div>
        <div>
          <h3 className={styles.car_head}>4</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
