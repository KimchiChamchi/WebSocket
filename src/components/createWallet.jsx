import React from 'react'
import 'antd/dist/antd.css';
import { Container, FormWrap, Icon, Form, FormButton, FormButton2, FormContent, FormH1, FormInput, FormLabel } from './createWalletElements'
import { Link } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CreateWallet = () => {
    return (
        <>
            <Container>
            <Button
            type="primary"
            icon={<PoweroffOutlined />}
            link = "./wallet"
          >
            지갑 연결하기
          </Button>
                <FormWrap>
                    <FormContent>
                        <Form>
                            <FormH1>지갑 생성</FormH1>
                            <FormLabel htmlFor='for'>비밀번호</FormLabel>
                            <FormInput type='password' required />
                            <FormLabel htmlFor='for'>비밀번호 확인</FormLabel>
                            <FormInput type='password' required />
                            <FormButton2 type='submit'>지갑 키 생성</FormButton2>
                            <Link><br/>보유한 지갑 키 연결하기</Link>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default CreateWallet;
