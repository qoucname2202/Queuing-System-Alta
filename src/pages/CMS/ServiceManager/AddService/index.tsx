import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Row, Col, Checkbox, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import ServiceServices from '../../../../db/services/service.services';
import IService from '../../../../db/types/service.type';
import Swal from 'sweetalert2';
import LogServices from '../../../../db/services/log_system.services';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../../features/user/userSlice';
import { getID } from '../../../../APIs/getIP';
type Props = {};
interface SizeTwo<T> {
  0: T;
  1: T;
}
type CapSo = {
  autoIncrease: SizeTwo<string>;
  prefix: string;
  surfix: string;
  resetEveryDay: boolean;
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddService = (props: Props) => {
  const [form] = Form.useForm();
  const history = useNavigate();
  const me = useAppSelector(selectUser);
  const [services, setServices] = useState<IService[]>();
  useEffect(() => {
    (async () => {
      let data = await ServiceServices.getService();
      setServices(data);
      form.setFieldsValue({
        auto: { checked: false, start: '0001', end: '9999' },
        maDichVu: '201',
        moTa: '',
        prefix: { checked: false, start: '0001' },
        reset: false,
        surfix: { checked: false, start: '0001' },
        tenDichVu: '',
      });
    })();
  }, []);

  const handleFormChange = (e: any) => {
    if (e.target.id === 'nest-messages_dichvu_maDv') {
      console.log(e.target.value);
    }
  };
  const onFinish = async (values: any) => {
    let { auto, maDichVu, moTa, prefix, surfix, reset, tenDichVu } = values;
    let capSo: CapSo = {
      autoIncrease: ['', ''],
      prefix: '',
      surfix: '',
      resetEveryDay: reset,
    };
    if (auto.checked) {
      capSo.autoIncrease = [auto.start, auto.end];
    }
    if (prefix.checked) {
      capSo.prefix = prefix.start;
    }
    if (surfix.checked) {
      capSo.surfix = surfix.start;
    }
    let service: IService = {
      ...capSo,
      maDichVu,
      moTa,
      tenDichVu,
      trangThai: true,
    };
    let index = services?.findIndex(item => item.maDichVu === service.maDichVu);
    if (index !== -1) {
      Swal.fire({
        title: 'Error!',
        text: 'M?? d???ch v??? ???? t???n t???i',
        icon: 'error',
        confirmButtonText: 'X??c nh???n',
      });
      return;
    }
    ServiceServices.addService(service);
    Swal.fire({
      title: 'Success!',
      text: 'Th??m d???ch v??? m???i th??nh c??ng',
      icon: 'success',
      confirmButtonText: 'X??c nh???n',
    });
    //Add user log
    let ipv4 = await getID();
    LogServices.addLog({
      action: `Th??m d???ch v??? m???i ${service.tenDichVu}`,
      actionTime: new Date(),
      ip: ipv4.IPv4,
      tenDangNhap: me ? me.tenDangNhap : 'Unknown',
    });
  };
  const handleBackService = () => {
    history('/services-management');
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 md:pt-10 relative service-add'>
      <div className='path text-gray-600 font-bold text-lg mb-11 '>
        D???ch v??? &gt; Danh s??ch d???ch v??? &gt;{' '}
        <span className='text-primary font-bold'>Th??m d???ch v???</span>
      </div>
      <h2 className='text-primary text-2xl font-bold mb-4'>Qu???n l?? d???ch v???</h2>
      <div className='w-full h-full add-content'>
        <h3 className='text-primary text-lg font-bold mb-3'>
          Th??ng tin d???ch v???
        </h3>
        <Form
          className=''
          name='nest-messages'
          onFinish={onFinish}
          validateMessages={validateMessages}
          onChange={handleFormChange}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={['maDichVu']}
                label='M?? d???ch v???:'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p m?? d???ch v???',
                  },
                  {
                    pattern: new RegExp(/^\d{3}$/gm),
                    message: 'Wrong format! Examples: 2xx, 201, 202, 102',
                  },
                ]}
              >
                <Input className='py-[10px] pl-3 ant-service' />
              </Form.Item>
              <Form.Item
                name={['tenDichVu']}
                label='T??n d???ch v???:'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p t??n d???ch v???',
                  },
                ]}
              >
                <Input className='py-[10px] pl-3 ant-service' />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                name={['moTa']}
                label='M?? t???:'
                className='textarea'
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p m?? t??? d???ch v???',
                  },
                ]}
              >
                <Input.TextArea className='py-[10px] pl-3 lg:block lg:ml-auto ant-service' />
              </Form.Item>
            </Col>
          </Row>
          <h3 className='text-primary text-lg font-bold mb-3'>
            Quy t???c c???p s???
          </h3>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <Form.Item name={['auto', 'checked']} valuePropName='checked'>
                    <Checkbox style={{ lineHeight: '32px' }} />
                  </Form.Item>
                  <span className='flex items-center h-[32px] mb-[24px] mx-1'>
                    T??ng t??? ?????ng t???:
                  </span>
                </div>
                <div className='flex items-center'>
                  <Form.Item
                    name={['auto', 'start']}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: 'Nh???p chu???i s??? c?? 4 ch??? s???!',
                      },
                    ]}
                  >
                    <Input className='rounded-lg inlineInput ant-service' />
                  </Form.Item>
                  <span className='flex items-center  h-[32px] mb-[24px] mx-1'>
                    ?????n
                  </span>
                  <Form.Item
                    name={['auto', 'end']}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: 'Nh???p chu???i s??? c?? 4 ch??? s???!',
                      },
                    ]}
                  >
                    <Input className='rounded-lg inlineInput ant-service' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <Form.Item
                    name={['prefix', 'checked']}
                    valuePropName='checked'
                  >
                    <Checkbox style={{ lineHeight: '32px' }} />
                  </Form.Item>
                  <span className='flex items-center h-[32px] mb-[24px] mx-1 w-[102px]'>
                    Prefix:
                  </span>
                </div>
                <div className='flex items-center'>
                  <Form.Item
                    name={['prefix', 'start']}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: 'Nh???p chu???i s??? c?? 4 ch??? s???!',
                      },
                    ]}
                  >
                    <Input className='rounded-lg inlineInput ant-service' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <Form.Item
                    name={['surfix', 'checked']}
                    valuePropName='checked'
                  >
                    <Checkbox style={{ lineHeight: '32px' }} />
                  </Form.Item>
                  <span className='flex items-center h-[32px] mb-[24px] mx-1 w-[102px]'>
                    Surfix:
                  </span>
                </div>
                <div className='flex items-center'>
                  <Form.Item
                    name={['surfix', 'start']}
                    rules={[
                      {
                        pattern: new RegExp(/^\d{4}$/gm),
                        message: 'Nh???p chu???i s??? c?? 4 ch??? s???!',
                      },
                    ]}
                  >
                    <Input className='rounded-lg inlineInput ant-service' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Form.Item name={['reset']} valuePropName='checked'>
                <Checkbox style={{ lineHeight: '32px' }}>
                  Reset m???i ng??y
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <span>
            <span className='text-primary'>*</span> l?? tr?????ng th??ng tin b???t bu???c
          </span>
          <Space align='center' className=' flex justify-center w-full md:mt-5'>
            <Button
              className='w-[160px] text-primary-400 rounded-lg font-bold text-base outline-none border[1.5px] border-solid border-primary-400 bg-primary-50 btn-cancel'
              onClick={handleBackService}
            >
              H???y b???
            </Button>
            <Button
              htmlType='submit'
              className='w-[160px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400'
            >
              Th??m d???ch v???
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default AddService;
