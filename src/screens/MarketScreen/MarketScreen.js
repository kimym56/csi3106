/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { useMyStyleListQuery } from '../../hooks/style';
import MarketListScreen from '../MarketListScreen';
export default function MarketScreen() {
  const [text, setText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState([0, 500000]);
  const [filterValue, setFilterValue] = useState(0);
  // 해야될것
  // 상의~가방 필터 선택시 아래 필터 적용되도록
  // 검색어 입력시 아래 필터 적용되도록
  // 가격 버튼 누르면 모달 뜨는데 textInput으로 입력시 useState 겹쳐서 초기화 되는 문제 해결
  // 가격 모달에서 적용하기 누르면 가격 필터 바뀌도록
  // 색상 필터 해야되나..?
  // 내 스타일 필터..
  // 마켓 리스트들 쿼리로 불러오도록 하는 로직...
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          flexDirection: 'column',
          alignContent: 'space-between',
          marginHorizontal: 32,
          height: 160,
          marginVertical: 20,
        }}
      >
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={filterValue == 1 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                onPress={() => {
                  filterValue == 1 ? setFilterValue(0) : setFilterValue(1);
                }}
              >
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZ7i-1aR8L2D5gGHfera8Qwwn60EiJkRskdWD_xKs2Zw8AYJLtPCQ61G7IItyTwucnlg&usqp=CAU',
                  }}
                  style={{
                    borderRadius: 22,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </TouchableOpacity>
              <Text style={filterValue == 1 ? styles.textSelected : null}>상의</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={filterValue == 2 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                onPress={() => {
                  filterValue == 2 ? setFilterValue(0) : setFilterValue(2);
                }}
              >
                <Image
                  source={{
                    uri: 'http://ojsfile.ohmynews.com/STD_IMG_FILE/2021/0928/IE002872453_STD.jpg',
                  }}
                  style={{ borderRadius: 22, width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
              <Text style={filterValue == 2 ? styles.textSelected : null}>아우터</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={filterValue == 3 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                onPress={() => {
                  filterValue == 3 ? setFilterValue(0) : setFilterValue(3);
                }}
              >
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGMmyhuujpXs1yYzeIMN9cgwgpVXosenOk2g&usqp=CAU',
                  }}
                  style={{ borderRadius: 22, width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
              <Text style={filterValue == 3 ? styles.textSelected : null}>원피스</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={filterValue == 4 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                onPress={() => {
                  filterValue == 4 ? setFilterValue(0) : setFilterValue(4);
                }}
              >
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,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',
                  }}
                  style={{ borderRadius: 22, width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
              <Text style={filterValue == 4 ? styles.textSelected : null}>스커트</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={filterValue == 5 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                  onPress={() => {
                    filterValue == 5 ? setFilterValue(0) : setFilterValue(5);
                  }}
                >
                  <Image
                    source={{
                      uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRIREhUYGBgSERgYEhgYEhISEhoRGBgZGRgYGBgcIS4lHB4rIRgZJzgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHzQsJCQxNDQ0NjU0NDQ0NDE0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0MTQ0NDQ0NDExNDQ0P//AABEIAO0A1QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgAFAwQGBwj/xABCEAACAQIDBQUEBwcDAwUAAAABAgADEQQSIQUiMUFRBhNhcYEykaHBFCNCUmKx8AdygpKi0eEVM1MksvFDc5Oz0v/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAQADAAICAwACAwAAAAAAAAABAhEDITEyEiJBYYEEUXH/2gAMAwEAAhEDEQA/ANiECARhLAgRgIBGEAiOBAIwgQCZsI1nT1+Ux2kvYoejge+4/tK2jpek5aHY0zcek5vaVPK9TxOYe7/EvsC91Eqtrr9av4so/qtMqdS25PDq2IJuODAH3iRFtw4HiPmIlLeU2+wdOuXiB6R0nQ5kYR1MEiyEHtMbxrxW19ICMtxOH2otq1Yfjb46/OdwZyvaSllqI1vbp6nqykg+oFolLJsQbi/uiZNtn6tvIfmImwWug8NPjH257DeU5pjt2fn9ObMQxjFM3cZTFMYxTJAimNBASSNaSBlhEEYSQwjCARhAIjgRRHEAxai3U242uPMaj8o0ZYTE4v8AY9YFAQeIB+E2UUfSF0Uk0WIDe0crDNlPIjMJSbFqZbr91tPLiPgZv7QOXEYKoOIqOo5k5kF1HUkAiwmMdWdFu6av8PYNdeDDW/G/jMzCa9NwSSp0PHqG6Ecv8TZVT4+6buUICZkt5/ymS3n/ACt/aQFDeMRgZmyjofcRFItAw5uspu0xXubW1FVMh6HXN/SCPdL116X9FMrtrYIPTKE5TmBQkEDOL2BPjcj1ECh2AfaXo02Nun6tvT8xNPYLb5HUD5iZ9utuW/GP7znn2ddZ+m/woDEIjmCbuUhixzFMBSICI1osASQyQMkYRRGEkMIwiiMsBxGEURxAIhEAhEDYwa7x9L+f6EHbHBmvg2yk/UutdrXDNTpEswUjUNlBIt0mu9xZhy0/XrL3Z9a6jqQL+6Y26trrpEWpjz/D7YrkXTEVUQg2YV2dSLboBe5142E0cfi8Tagz1Hq2RnbNUq1CXexAKlhbTgACNdJ2XaXsngTRerZqXdjdFNgqFmOiBG3RmOnK04zaNVKrFlFgTlA+6FUsn8uTU9NZ28c1tHTz+SLVtkqxHdQjq7gl2ZglSqtlzaDRtePwjnEMupaqxF2B7+oAx1sL5vG/pEquA1uJA8NTqb/Oa5qgDha979POaxSMUm0t5NqYlERVrYlWZfrCK1W4ZCBdGDX1AHD+8X/W8aoK/SsVpxviql+IOjXvwB0vETFZkYk+wzqCRyyK1geQ1M1u8BseXLxGsrFYlPylYYbbGKDDPisQctQWQ42updTrYWa/w5Sww21Kwr0s1Sr9VVUsz1alUksLEWcniGIlVR1AYcVuLczcEA/GWWBwpxD06FNkNQ5kIZ1VcoGYarffW1wOJkfGIrOomZtPTvNiJ9b4Khv7xabG2xuX6OPjMmy8C1IDOwZigDWGlxx4+ImLatU5HXrlB99/lPOtO26enWucfajMBhMhm7kLFMcxTASSGCAskNpIGQRhFEYSQRGEURwIDLHEQRxAIjCARhADjdP7pt5iZsDUcJ3iDNkazqDrl4m3pEWYsG7U3c0zfJ7SDUlQM2Uj72U3EpaG/DOTMNb9peIZ9n5qZ3fpNJm0NghzWLHkLke+cXhMa7rclScrewRl4cBblfXlPRi9NNxiGw2MBVOSB2408x0Vje6g8SLDW04TbWzKOGqZard2zXahWRSqVEuAQ6DdDjgwFuo6DXgtHiWX+VWfMKvELvBDxsR0P6tMLMwFjrbn1HX8ptY3CsQGaxUk5XRs9M9MrDgfAyqqLUVr5iwXd4X48yB8Z2WlxV7JWfQKTbM7Mwud4hgLW9PhN5KtwNLKNb3i0UL2cqFUAM7Wso1LEFm0HrMzVqJIXMWLXLFVIQXPAE8dZnSe9aW6gKVUk3AsOXO4IN7wY6u1FRWo7ppspXdKkNmGXUeRlpQw7mzpRYKNMzkUaf8AO9h7rys7RsWSnQWpTqVHcApRbvANbLmYC3EjSOTPjqtJmZiIezYHHLXoUsQNBVpo/gMw1+N5V7Ua/qw/IzLs+iKNPC4G9zTpKr/wi7XtyufhBtRgwLD74y+I4flc+6edHs9a3pn8KowERjFM2cQGAxoDAQiLGMkBZIZIDRhFjCSGEYRBHEBxHEQRxCREYRRGEB1GoHUzkdlbeUY2uuYI1SvkVX0K1qZy0zcmxBtlI8ROuRgDc8Bqb6Cw1P5TyFnRiXNTK5cls9J2GdiW5DTj0mlK/KJ1WbfG0S9XqV0KP3iZsPUzJi6Z40iTq5X7lyGzD2dDw1FVtOo9Gk2HxGTE0GRvotRqlNKneqLor5yLtw3l4gk2lXgNsYlnp1qT52p01WoPo9b6xVOjPu2zWNrjkToZjavikzhkKUmqtURHwVbEUUvfKqsAMoAYyleG0Tstb89ZrOeWvh8MVUvQcU1cWKNUo1aROv3XK31PT1lXtPHFPb3amX7BVqd/Ea8r8Jlx1PCtcsoVsp1WhXppf+IaCae0cEq4JMQLAPiWREsCpVU1cniTcn4Totb41cda7I4XDLXygqHca2SpTZeOn1eYEm2kvKNTuUAPf0gOdLALTJHH23ZtfKcbs3EKN16auPsk7pDW0uROr2ZtkjKtNQCRbKm0KlNj4ZWsG8tZFZ2Ixa0TpRWwLNmenWqt9+vVq9DoSqGw6zZ2TjaGHNXEfR37yo+XDd3bEUyw0VEdbgMdTfjxFpYnEVwpZqdYDTefB4fFIPH6sKxHnMVDFrTZqubDGrYjMqLhXFMD2RTrBSCTe5uZXk20ZC3FMVnZl0ewu/RalbFlVrV/YQG4p0zYWY/e0F/KZsS4OUAghRy6n/AErNl4s1kLtlJDkXSotRTYD7S6E68OU3TOWK5PbrvyRNcqUxYxiy7BJDJIYCmLGMEASQyQII4iCOJIgjiKIwgOI4iCOIBEYRRGkpJiaiolR2NlSk5Y9FCNPMNmYtiFQmoCFUFqfd5jbmxbX/xO97VPlweJPVFX+Z1BnFbGo3YAghQeHD0Fvz4zbijrWPJLe+jJdXepVsu8O8rdNbWzHlppMtPDoN+lUxHHgjuvU6DmPOX+FwVOwKot+rLmPqTNocNRZhobHd9JpNmOS4HaWJYmxVr63L5C/wDSPCdD2o2aBswKOOHWlUHmxVX/APsB/hlRisGXxNOj/wAlRV14WJ3j6KGPpO07Q0c+GxdNQd7DOVAFzuAOAP5AJlzT4htxR1rx3DAA38BaXez6dNjlYENyYEcdeIOjDzlMg3VItvkD/PxnR7Cw4Zla2l/ceh90tx+qt15gcJTUHcZWv/uUWakSPxIpBHjymXEo5XOa1bID9oiooItzBIHwlxhaI3fX3xMfQU3ZbhvvA6nkbjgRK/PtWYnA2GtqKkG+Zna+UJcXsCQOdhN4zHhEy06a2AtTGg4XOsyGY2nZl0VjopghMEhISSSQAYtoxgMASQyQBGEEIkgiOIgjiA4jCKIwhJhHEQRhArO1K3weL8KQb1V0N5zOCwzJla26bEEajznUdpT/ANHi786BAv1LLYSo7MVC+HRbXZSQQWtYcifTlNuOcrLDl/FphWuMy9BfWwE2WfTMOFuPH3CawRr71rg6CwCcOQ+ZmV23TbnfnCii2HRDY6pUOvd0mIJ++xCD4M06t6qoGdzZaaMznoiqWb4AznuzQBrYth9xBfkd5+HulvtamXw+KReL4WsFHVu7Yge8SnJ5bcfq8botu0/C/PnO17N0uDDQ21OnTgRzE4rBtbI3Seg7CVbKo3S2oB9hiLewetvsnXpfjL1n6s7+XQ4ZtACMptyJKnyPyiYw2DHop/IyLpucbe0eNj0HjaaO28TkpNrxWynnYg8ZT9Pxap7K/ur+QkMa1gB0UfkIplJbhBJJIAkMkhgQxYYIEkkkgQQiKDCJIYRhFEMDII4mNY4MJMIwiiMIFD25r5MIRzetTAHMhCXb8hNDY+Aen3dam2ZXAYgnUq3jz/xE/aBWIODX7BZ83mSF+csNmArTWmLqqaD71r8uk2p6sOTyuHqDQBSzW9kaW/eY8JoY+qQpzEaj2R7I+ZmZa+VdBa3IdepPPzlTtR93U/rw+EVjtSZ6ZOyTEvijy+rA8wH+RE6VDrr0N/IDWVHZvCFKJdtGrOXt0S2VPeBf1lqBe46qQPMggfnM7Ttm9YyrxHDpuA/ind9mqjMgWwPnY+R8/GcXglvSIHEMCo8rk/ATquytex8uHl+jNK+rK3l1iKU4i4J48wfxdRfnKnb13FhwHHy/VpcOCbEa3G6NefjNF8NyJBJYe640v8pEeULhvkPymMx3Op84hmLoLJIZIEMkhkgCAwyQFkhtJAFoRJJJDCGAQiA6xxMYjrAcRhFELMqhmYhVVSzsTYKiglmPgADA5Xt7hWYYR7biVWD+DEXW/naatParWtTAY9Nb28LSn7R9oTiqqLTBFKmxFMHRnJ4uw5X6chLzZuzrKtnV8xuCCqm+mgueU2rH1Yck9trA7QD7rDK4DcSCrDoSOB53M1NqknKo56DxJ3R8TNnE92hDvmLJbVLM4HNX++PjKrCY0VcSlOiHdatTTMqoUAs7uNfZCqSQekt1HasRsu+VMoVPuqq/ygD5THicQKSPWbhSpu5/gUsB6kATMxuSepMqe1IJweLA/wCD4Z0JPumDpea7FrDRX1zuddDv2uL69bzptn4VEa6XLG2VAQSbeB4LyufS85jZtXIxzq+UEsWRVLhtADlbW3XznT7Gx2HUEKWU3BLVKFULfS2d1zW8zpNo9cYWjvV3SepbfJRel78dbAcTNlFtl0+0tr+1e4uTJTptoxKsWAym7OpHG6EWUjyMiuxdFbXeJ4iwsCfZlcyCJ7humLGimYtyySGSBIJDJAkkkMASSSQBJCYLyQRGEQGMIDiMDEEYQMgnP9ua7Lhu7Vspr1Ap04ogzEeth7pfqZxX7Sax/wCkUHk7et1W/wAZNfPZbw5zZmAFwXPG9tLnhwE65KFRFzUgjoVu6E5VfTXfOiPx1vbrOTwGIyimx1GcXOmliNdZ1eHCOd7NV42ztccDwTgPdOrIzpyzM72bEqChFOwuAMjFUqLrwIB1OvkRzidksL9dUci3d0rDSzFqlwb8tAD75TbX7osERUZr6mw7seAP2rdeE6zslhWSiXc3NV7rw0poMqjTlfMfWZ36jF+ONnV4JjxeHFRKlI/+rSdPLOjKD6EiPGQ6jzEwdDzLAYHElGVqTXNkdmIsGDWYksdLc/ES4wlF6BJLUaacMzYhEzdbD2mPgBOY2jWZK2JQgVEXE1BZgQL52uVPFWuTrLbAqFuyM413lurlNNNGBFvxD1nTSdjHNeMnZdNhqqt/taXGrlXp02P4KVxm/ea3hebuGtnNySwS5JsOg0UcOcqqDtl0KNfhmXITf8acP5TNnZGKD1Kls3+3cgixBzqLHkfMXBlbV6krP2hcRTCTFM53QBkkMEAGAGEwCA4kgEMCWkkkgAwQmCSBGUxLRhAcRxMYjiA4nBftDqjv6Sn7FAEDpmY//md6s4Ht+oNcdfo1Pz9qpLV8ot4UeAcEW/Fw8CZZYLEW3Bex43Nr68PLr1nO0Dka9+Fx56SzwbAm46/KdNLawtVu1X1LdM1vMz0fAj6qj/7Kf9onm1Cg1V6dJPaq1Ag9Rq3kASfSen5QLBeCgBf3QLD4CZcy/FAQqdR5yGS44nQDUnkFAuT8Jk1eX4+iO9rX4jEVmfpcO1j6zAuMdWDU1sy+y2vPiCOYPMGbGJqLWarWGi1KzuBzyXJW48iDCKiKAQpNzcAAnQcSTOqkfVz2ntuYXaDkHvRa2t7ZV05Cb/ZnHZsRlFwKlJxrxzLZx8FM52s9R9WGVR7K3t8Ju9lg/wBLo3IsO8vY3OXun/xIt6zCKx9tegQGSScjpSCQwQJJJIIBEMEMCSQSQIYIxiyQIRAYRAYRxEEYQMgnn/b6sFxCAqbHDIM38bzvxOJ7c7QoirTpMhc00YVGHLPYqo6kDX1lqz2rPhy2FyMSjAHPcqftA24AzCc1JgRqt90+Hj4x2wnBqRDgHMpHtC3JhN8JnUNYb3tK3C/h0m8Rv/VJlb9kag+k0Txzioq+BamxH/aR6iegTzTs5TIxNBKV2Iqoz2uyoisC5LW4WB/KelTLk8rU8JIEDbp4PdT+6wyn4GQwBrEHpM2jxaninou6aMEYqw5XU5bj3Tawm0k1RxZTe3gSb28RN3tJsz6PiKlxuVCXpnkVZibeBUki3lKkU6TAANZvcDNazbOpZWiP9Lg4dG3ka4I5GXPY/Cjvqj21p0Svq7AD+lXnJUqVWm24bHjY8CPDlO17E4kOuIJXK4ZA48LNb43l72+vasV7dRATITAZzNkgvBeC8A3kvBeSAwjQCGBJJJIBMUwkxCZIMgMXNBmgZQYwMwhoweA2IxKU0eo5siKWc2vZR0HM3sPWebbV2tRxFWpUdSqu25cgOqKAq3A56X9Z6Hi6Iq06lEmwq03S/QsN0+hsfSeUvgHom+IpumpXeTdzAcNePp4S1ZyUTGwQUSDmo1ATyytkc+an5Qis+Uq+ZTcakMAfMiZqGGptwVgADdn0v5KNTCtIXtTqfwknh+6wE0iJjwpsfrsf2f4nDinUoofrSxaoSPbQWy5TzC31Hjeddeed9mKDHFUGYAFGdiVBW4Wm97jhzAuJ32eZ2jJWrOwykxSZjzzR2xtLuKTVcuchlVVvZc7mwLH7o/tKrarO3lNDh1ZhdxVC0+pDhs+nMCwPmJwiU8PlHeEK3MKWb320BmbGbSNWo1Su7MStgbbg19lV5J+tZhp90WGQM7Ei1lsL30GvCa1jIUmdls0cZh1UqGZhfQNfTyPLjOk7GYmmXrKgN3pob3vfIxBv0O+PdOQr4YAhyrDe4FkcX42IBBnoOwcXhXVjh6a02Fu9QLZg3iea3vYyLXnMxEVjdhdExc0xl4M8yaMhMF5izyZ4GYGETBnjB4GdYbzBnkDwM95JhzyQHLRSYuYSSQC0XNCV8YDT/V4Azxg8Q0jAaLQMwec4uzMRtLE1adMXGHuql6hp0adMFhmNgxzMQeA1seQvOhwuBrVHCU1zMT45V/Ex5KJ22ydn0cOjKLFXbNVfKQatUWF7DUqLADrbnEThMODf9ll0L0sS3eqNFdWSm7Ebvdve6g8swby1nn+0Nn1EZkqIysj5SGXI6t91x14ajQjWfR5qI4bQspFyGpsoNje4DAc+c4f9oGzTXalTVR3lVSlGqLXXEoM4oVeqOButyaw4MbTW+T2rNXC9isGVapW+yEyKSNczEFreFgPfOuLyqw+IpoiIuigaacb6k+sJ2inWLTspiMhZF5W7fwrV8PVpL7Vg6DqyHNl9RcedoP8AUk6yLi0PBpXUvN6mDNr5gdLtxAAHHjr6cZ23Ybsn34XEVhajcCmlyhqsGAJcjgg8NSRHr9n1xFZKgVmS+bEJTNMO5BuCudlALagnjO72fjAT3VOk6mnTuiGm6ABCoyg2KmwN9Cb5TJm2+ERWV9s/YmDXOaeHpIrjKQaaEsAxBYk3vf5znNp9iUpVDiMGBd0KvSByKTcNenc+Hsk+V+Euk2nhlK0zWUGkqrvB1AcLvEPaxO8dRcTfTaVJlyrUV+Gi3byBsCTK/JPxecOSpKsCCDZgQVYHoQdRFNSd5tXY9PErmIdXA3XWmb26NnIDDz984rG7Oq0XNN11tcEWKsh4EWJ919I0xr55M8Iot0mRcOZIx54VMzrQjij4QNfWOLzP3cPdwMEkzWkgQ4aD6L4zbEIEDU+i+MP0U8jNu0YCBXtRYRRmHOWdovcqeXGA2wyxd95huahTlzAm291A6eM6fCVqCDfdFb8WIsf6mE47EYGlVUqymxGtndD71IlSOxOz/wDib/5an95Br1NqaNbIxN+aVifXiZyW3qtSnUCUnbNbOzMqM2ZgQDnJuWGtt0W8ZT7P7NYOib0qZU9e9qE/nLUKOIFv11jE6ol2Wx4hQPlG/wBCp/at6CXMIElCpXYdEfZ+JmQbIpfd+Oss7QWgVtLZiIcysf4grD0mx9GbSzAkcLmso9Qr8Js2h4RoGynq0gUdsy3OVVbQAm9t/XrzPGWLbXZQbJWa1tFegpJvawLOAOPPpNARiJA2j2mxI0TAOfGpjsJT+CFpq4vFVaxV6qJTKrYKlRqote/tFRrrJEaEsfd+UBpiZLSWgYskGWZDCYQxZYCkzNEaAmWSMJIS/9k=',
                    }}
                    style={{ borderRadius: 22, width: '100%', height: '100%' }}
                  />
                </TouchableOpacity>
                <Text style={filterValue == 5 ? styles.textSelected : null}>바지</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={filterValue == 6 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                  onPress={() => {
                    filterValue == 6 ? setFilterValue(0) : setFilterValue(6);
                  }}
                >
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1DeF6XAiS9sELTR-xmQxAmYdYPnCY05F5SzxRqfxw5jxgmB3CNikalvH6Q-PIYXuZ5s&usqp=CAU',
                    }}
                    style={{ borderRadius: 22, width: '100%', height: '100%' }}
                  />
                </TouchableOpacity>
                <Text style={filterValue == 6 ? styles.textSelected : null}>신발</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={filterValue == 7 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                  onPress={() => {
                    filterValue == 7 ? setFilterValue(0) : setFilterValue(7);
                  }}
                >
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pcMyNExENB_xtqO9PavVNERLsavraU-wHwx8bQkc_8WnT25Xs6D_iRlTrEb94XM1AyU&usqp=CAU',
                    }}
                    style={{ borderRadius: 22, width: '100%', height: '100%' }}
                  />
                </TouchableOpacity>
                <Text style={filterValue == 7 ? styles.textSelected : null}>악세사리</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={filterValue == 8 ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
                  onPress={() => {
                    filterValue == 8 ? setFilterValue(0) : setFilterValue(8);
                  }}
                >
                  <Image
                    source={{
                      uri: 'https://ilyo.co.kr/contents/article/images/2018/0824/1535094319815497.png',
                    }}
                    style={{ borderRadius: 22, width: '100%', height: '100%' }}
                  />
                </TouchableOpacity>
                <Text style={filterValue == 8 ? styles.textSelected : null}>가방</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Divider bold={true} style={{ marginHorizontal: 16, marginBottom: 4 }} />
      <View
        style={{
          maxHeight: 36,
          borderWidth: 0.5,
          borderColor: '#d8d8d8',
          borderStyle: 'solid',
          borderRadius: 20,
          marginHorizontal: 16,
          marginVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextInput
          style={{ padding: 0, marginLeft: 12, fontSize: 14 }}
          onChangeText={(e) => setText(e.value)}
          value={text}
          placeholder="검색어를 입력하세요 (예. 골덴 바지, 청자켓)"
        />
        <Icon name={'search'} size={24} style={{ marginVertical: 6 }} />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} backdropColor="black">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
          onPress={() => setModalVisible(false)}
        />
        <View
          style={{
            position: 'absolute',
            borderWidth: 1,
            top: 370,
            marginHorizontal: 16,
            width: 328,
            height: 150,
            backgroundColor: 'white',
          }}
        >
          <Text>가격을 설정해 보세요!</Text>
          <Slider
            style={{ flex: 1 }}
            value={sliderValue}
            onValueChange={(value) => {
              console.log(value);
              setSliderValue(value);
            }}
            minimumValue={0}
            maximumValue={500000}
            step={1000}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextInput
              value={Number(sliderValue[0])}
              onChangeText={(e) => {
                setSliderValue([e, sliderValue[1]]);
              }}
              keyboardType="number-pad"
              style={{ fontSize: 14, backgroundColor: 'gray', width: 80, height: 30, padding: 0, textAlign: 'center' }}
              placeholder={'' + sliderValue[0]}
            />
            <TextInput
              value={Number(sliderValue[1])}
              onChangeText={(e) => {
                setSliderValue([sliderValue[0]], e);
              }}
              keyboardType="number-pad"
              style={{ fontSize: 14, backgroundColor: 'gray', width: 80, height: 30, padding: 0, textAlign: 'center' }}
              placeholder={'' + sliderValue[1]}
            />
          </View>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              borderWidth: 1,
              height: 30,
              width: 80,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              margin: 16,
            }}
          >
            <Text>적용하기</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={{ marginHorizontal: 18, flexDirection: 'row', width: 328 }}>
        <View style={{ marginRight: 12 }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: '#6600ff',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              width: 58,
              height: 26,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={{ fontSize: 12, color: '#6600ff' }}>가격</Text>
            <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginRight: 12 }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: '#6600ff',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              width: 58,
              height: 26,
            }}
          >
            <Text style={{ fontSize: 12, color: '#6600ff' }}>색상</Text>
            <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginRight: 12 }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: '#6600ff',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              width: 82,
              height: 26,
            }}
          >
            <Text style={{ fontSize: 12, color: '#6600ff' }}>내 스타일</Text>
            <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
          </TouchableOpacity>
        </View>
      </View>
      <MarketListScreen />

      <View />
    </View>
  );
}
const styles = StyleSheet.create({
  selected: { borderColor: '#6600ff', borderStyle: 'solid', borderWidth: 1, borderRadius: 22, width: 44, height: 44 },
  textSelected: { color: '#6600ff' },
});
