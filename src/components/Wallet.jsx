import React from 'react'
import 'antd/dist/antd.css';
import { Container, FormWrap, Icon, Form, FormButton, FormButton2, FormContent, FormH1, FormInput, FormLabel } from './WalletElements'


const Wallet = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form>
                            <h1>
                                지갑 키확인
                            </h1>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default Wallet
