import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import './style.scss';
import IDevice from '../../../../db/types/device.type';
import IService from '../../../../db/types/service.type';
import DeviceServices from '../../../../db/services/device.services';
import ServiceServices from '../../../../db/services/service.services';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import SystemLogServices from '../../../../db/services/log_system.services';
import { getID } from '../../../../APIs/getIP';
import { selectUser } from '../../../../features/user/userSlice';
import { useAppSelector } from '../../../../app/hooks';

const UpdateDevice = () => {
  const { Option } = Select;
  const { id } = useParams();
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [deviceUpdate, setDeviceUpdate] = useState<IDevice>();
  const [form] = Form.useForm();
  const getInfoUser = useAppSelector(selectUser);
  const history = useNavigate();
  function handleChange(value: any) {
    console.log(`Selected: ${value}`);
  }
  const deciceList = ['Kiosk', 'Display counter'];
  const children = [];
  for (let i = 0; i < deciceList.length; i++) {
    children.push(<Option key={deciceList[i]}>{deciceList[i]}</Option>);
  }
  // Get devices and services from firebase store
  function handleChangeSelected(value: any) {
    console.log(`Selected: ${value}`);
  }
  // View data
  useEffect(() => {
    (async () => {
      let device = await DeviceServices.getDevice();
      let idxDevice = device.findIndex(item => item.id === id);
      if (idxDevice !== -1) {
        setDevices(device);
        let service = await ServiceServices.getService();
        setServices(service);
        const deviceClone = { ...device[idxDevice] };
        setDeviceUpdate(deviceClone);
        form.setFieldsValue({
          maThietBi: deviceClone.maThietBi,
          loaiThietBi: deviceClone.loaiThietBi,
          tenThietBi: deviceClone.tenThietBi,
          tenDangNhap: deviceClone.tenDangNhap,
          ip: deviceClone.ip,
          matKhau: deviceClone.matKhau,
          dichVuSuDung: deviceClone.dichVuSuDung,
        });
      } else {
        history('/devices-management');
      }
    })();
  }, []);
  const handleSubmit = async (values: any) => {
    const deviceItem: IDevice = {
      ...values,
      trangThaiHoatDong: true,
      trangThaiKetNoi: true,
      id: id,
    };
    // Ki???m tra m?? thi???t b??? trong h??? th???ng c?? t???n t???i hay ch??a
    const idxDevice = devices
      ?.filter(item => item.id !== deviceUpdate?.id)
      .findIndex(item => item.maThietBi === deviceItem.maThietBi);
    if (idxDevice !== -1) {
      Swal.fire({
        title: 'Th??ng b??o',
        text: 'M?? thi???t b??? ???? t???n t???i',
        icon: 'error',
        confirmButtonText: '????ng',
      });
      return;
    }
    DeviceServices.updateDevice(deviceItem);
    // console.log(deviceItem);
    Swal.fire({
      title: 'Th??ng b??o',
      text: 'C???p nh???t thi???t b??? th??nh c??ng',
      icon: 'success',
      confirmButtonText: '????ng',
    });
    let ip = await getID();
    SystemLogServices.addLog({
      tenDangNhap: (getInfoUser?.tenDangNhap as string)
        ? (getInfoUser?.tenDangNhap as string)
        : 'Unknown',
      actionTime: new Date(),
      ip: ip.IPv4,
      action: `C???p nh???t thi???t b??? m???i ${values.maThietBi}`,
    });
  };
  const handleBackDevice = () => {
    history('/devices-management');
  };
  return (
    <div className='content pl-[24px] pt-[29px] pr-[100px] lg:pr-2 relative'>
      <div className='path text-primary-gray-light-400 font-bold text-xl leading-[30px] mb-4'>
        Thi???t b??? &gt; Danh s??ch thi???t b??? &gt;{' '}
        <span className='text-primary-500 text-xl leading-[30px] font-bold'>
          C???p nh???t thi???t b???
        </span>
      </div>
      <h2 className='text-primary-500 text-2xl font-bold'>Qu???n l?? thi???t b???</h2>
      <div className='py-2 px-6 rounded-2xl shadow-[2px_2px_8px_rgba(232, 239, 244, 0.8)]'>
        {/* <h3 className='text-xl font-bold leading-[30px] text-primary'>
          Th??ng tin thi???t b???
        </h3> */}
        <Form className='update-device' form={form} onFinish={handleSubmit}>
          <Row gutter={{ lg: 32 }}>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='M?? thi???t b???'
                name='maThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your device number!',
                  },
                  {
                    pattern: new RegExp(/^KIO_[0-9]{3}$/),
                    message: 'MaThietBi format is KIO_xxx',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary ant-device'
                  placeholder='Nh???p m?? thi???t b???'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='Lo???i thi???t b???'
                name='loaiThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your type of device !',
                  },
                ]}
              >
                <Select
                  suffixIcon={<CaretDownOutlined />}
                  size={'large'}
                  placeholder='Ch???n lo???i thi???t b???'
                  onChange={handleChange}
                  className='w-full h-11'
                >
                  {children}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='T??n thi???t b???'
                name='tenThietBi'
                rules={[
                  {
                    required: true,
                    message: 'Please input your device name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary ant-device'
                  placeholder='Nh???p t??n thi???t b???'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='T??n ????ng nh???p'
                name='tenDangNhap'
                rules={[
                  {
                    required: true,
                    message: 'Please input your user name!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary ant-device'
                  placeholder='Nh???p t??i kho???n'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='?????a ch??? IP'
                name='ip'
                rules={[
                  {
                    required: true,
                    message: 'Please input your IP Address!',
                  },
                  {
                    pattern: new RegExp(
                      /^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/,
                    ),
                    message: 'IP Address format is incorrect!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary ant-device'
                  placeholder='Nh???p ?????a ch??? IP'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} xl={12}>
              <Form.Item
                label='M???t kh???u'
                name='matKhau'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input
                  className='w-full h-11 rounded-lg hover:border-primary ant-device'
                  placeholder='Nh???p m???t kh???u'
                  autoComplete='off'
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label='D???ch v??? s??? d???ng'
                name='dichVuSuDung'
                rules={[
                  {
                    required: true,
                    message: 'Please input your current service!',
                  },
                ]}
              >
                <Select
                  mode='multiple'
                  size='large'
                  onChange={handleChangeSelected}
                  className='w-full'
                >
                  {services &&
                    services.map(service => (
                      <Option key={service.maDichVu}>
                        {service.tenDichVu}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <span className='text-sm font-normal leading-5 text-primary-gray-300'>
            <strong className='text-primary-red'>* </strong>
            L?? tr?????ng th??ng tin b???t bu???c
          </span>
          <div className='flex justify-center items-center mt-6 gap-x-8'>
            <Button
              className='w-[160px] text-primary rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-white btn-cancel'
              onClick={handleBackDevice}
            >
              H???y b???
            </Button>
            <Button
              htmlType='submit'
              className='w-[160px] text-white rounded-lg font-bold text-base outline-none border border-solid border-primary-400 bg-primary-400'
            >
              C???p nh???t
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateDevice;
