import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MarketClassIcon from './MarketClassIcon';

export default function ClassFilter(props) {
  return (
    <View style={styles.classContainer}>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View style={styles.classInnerContainer}>
          <MarketClassIcon
            filterValue={props.filterValue}
            value={1}
            link={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZ7i-1aR8L2D5gGHfera8Qwwn60EiJkRskdWD_xKs2Zw8AYJLtPCQ61G7IItyTwucnlg&usqp=CAU'
            }
            name={'상의'}
            onChange={props.setFilterValue}
          />
          <MarketClassIcon
            filterValue={props.filterValue}
            value={2}
            link={'http://ojsfile.ohmynews.com/STD_IMG_FILE/2021/0928/IE002872453_STD.jpg'}
            name={'아우터'}
            onChange={props.setFilterValue}
          />
          <MarketClassIcon
            filterValue={props.filterValue}
            value={3}
            link={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGMmyhuujpXs1yYzeIMN9cgwgpVXosenOk2g&usqp=CAU'}
            name={'원피스'}
            onChange={props.setFilterValue}
          />
          <MarketClassIcon
            filterValue={props.filterValue}
            value={4}
            link={'https://cdn.imweb.me/thumbnail/20211005/0d1de24370323.jpg'}
            name={'스커트'}
            onChange={props.setFilterValue}
          />
        </View>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View style={styles.classInnerContainer}>
            <MarketClassIcon
              filterValue={props.filterValue}
              value={5}
              link={
                'http://tomonari.co.kr/shopimages/gujelove7/6030020010502.jpg?1616748910https://cdn.imweb.me/thumbnail/20211005/0d1de24370323.jpg'
              }
              name={'바지'}
              onChange={props.setFilterValue}
            />
            <MarketClassIcon
              filterValue={props.filterValue}
              value={6}
              link={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1DeF6XAiS9sELTR-xmQxAmYdYPnCY05F5SzxRqfxw5jxgmB3CNikalvH6Q-PIYXuZ5s&usqp=CAU'
              }
              name={'신발'}
              onChange={props.setFilterValue}
            />
            <MarketClassIcon
              filterValue={props.filterValue}
              value={7}
              link={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pcMyNExENB_xtqO9PavVNERLsavraU-wHwx8bQkc_8WnT25Xs6D_iRlTrEb94XM1AyU&usqp=CAU'
              }
              name={'악세사리'}
              onChange={props.setFilterValue}
            />
            <MarketClassIcon
              filterValue={props.filterValue}
              value={8}
              link="https://ilyo.co.kr/contents/article/images/2018/0824/1535094319815497.png"
              name={'가방'}
              onChange={props.setFilterValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  classContainer: {
    flexDirection: 'column',
    alignContent: 'space-between',
    marginHorizontal: 32,
    height: 160,
    marginVertical: 20,
  },
  classInnerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
});
