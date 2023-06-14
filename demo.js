import React from 'react';
import './index.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  RightCircleFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Layout,
  Menu,
  theme,
  Space,
  Table,
  DatePicker,
  Tabs,
  Typography,
  Col,
  Row,
  Select,
  Modal,
  Input,
} from 'antd';
import { useState } from 'react';
const { Text } = Typography;
const { Title } = Typography;
//Tabs
const onChange = (key) => {
  console.log(key);
};
const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
//테이블 데이터
const columns = [
  {
    title: '기간내 중복방문 IP',
    dataIndex: 'ip',
  },
  {
    title: '상세조회',
    dataIndex: 'detail',
  },
  {
    title: '클릭수',
    dataIndex: 'c_num',
  },
  {
    title: '유효한 클릭 수',
    dataIndex: 'c_val',
  },
  {
    title: '중복된 클릭 수',
    dataIndex: 'c_inval',
  },
  {
    title: '광고노출 차단 관리',
    dataIndex: 'ad_ban',
  },
];
//테이블 내 확장 테이블 데이터
const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    ip: 'John Brown',
    detail: <Button>상세조회</Button>,
    c_num: Number(`${i}2`),
    c_val: Number(`${i}1`),
    c_inval: Number(`${i}`),
    ad_ban: <Button type="primary">노출제한 설정</Button>,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}
//테이블 데이터 종료

//테이블 내 확장 기능
const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

//측정항목 데이터
const inflow = [
  { value: 'all_inflow', label: '전체유입횟수' },
  { value: 'inflow5', label: '전체 유입 횟수 5회 이상' },
];

for (let i = 2; i <= 11; i++) {
  inflow.push({
    value: `inflow${i - 1}0`,
    label: `전체 유입횟수 ${(i - 1) * 10}회 이상`,
  });
}
const clickcount = [
  { value: 'all_clc', label: '전체 클릭수' },
  { value: 'clc5', label: '전체 클릭 수 5회 이상' },
];

for (let i = 2; i <= 11; i++) {
  clickcount.push({
    value: `clc${i - 1}0`,
    label: `전체 클릭 수 ${(i - 1) * 10}회 이상`,
  });
}

//탭 내부

const TabDetail = () => {
  //기간,측정항목
  const inflowChange = (value) => {};
  const cpcChange = (value) => {};
  const refChange = (value) => {};
  const clickcountChange = (value) => {};

  //테이블
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedTab, setSelectedTab] = useState('1');
  const [hasData, setHasData] = useState(true);
  const [top, setTop] = useState('none');

  const tableColumns = columns.map((item) => ({
    ...item,
  }));
  const tableProps = {
    expandable: {
      ...expandable,
      expandedRowRender: (record) =>
        selectedTab === '1' ? <SubTable /> : null,
    },
    rowSelection,
  };
  //모달
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '확인',
      cancelText: '취소',
    });
  };

  return (
    <>
      <Space
        direction="vertical"
        size={12}
        style={{ backgroundColor: 'white', padding: 10 }}
      >
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <Text>
              기간&nbsp;
              <RightCircleFilled />
            </Text>
          </Col>
          <Col span={6}>
            <RangePicker
              cellRender={(current) => {
                const style = {};
                if (current.date() === 1) {
                  style.border = '1px solid #1677ff';
                  style.borderRadius = '50%';
                }
                return (
                  <div className="ant-picker-cell-inner" style={style}>
                    {current.date()}
                  </div>
                );
              }}
            />
          </Col>
          <Col flex="auto" />
        </Row>
        <Row justify="space-around" align="middle">
          <Col flex="100px">
            <Text level={5}>
              측정항목&nbsp;
              <RightCircleFilled />
            </Text>
          </Col>
          <Col flex="auto">
            <Space wrap>
              <Select
                defaultValue="CPC_ALL"
                style={{
                  width: 210,
                }}
                onChange={cpcChange}
                options={[
                  {
                    value: 'CPC_ALL',
                    label: 'CPC 광고 매체 전체',
                  },
                  {
                    value: 'naer_serach',
                    label: '네이버 사이트 검색광고',
                  },
                  {
                    value: 'naver_Click',
                    label: '네이버 클릭초이스 상품광고',
                  },
                  {
                    value: 'naver_shop',
                    label: '네이버 쇼핑검색광고',
                  },
                ]}
              />
              <Select
                defaultValue="ref_all"
                style={{
                  width: 210,
                }}
                onChange={refChange}
                options={[
                  {
                    value: 'ref_all',
                    label: '레퍼러 전체 선택',
                  },
                  {
                    value: 'ref_ex',
                    label: '레퍼러 있음',
                  },
                  {
                    value: 'ref_notex',
                    label: '레퍼러 없음',
                  },
                ]}
              />
              <Select
                defaultValue="all_inflow"
                style={{
                  width: 210,
                }}
                onChange={inflowChange}
                options={inflow.map((inf) => ({
                  label: inf.label,
                  value: inf.value,
                }))}
              />
              <Select
                defaultValue="all_clc"
                style={{
                  width: 210,
                }}
                onChange={clickcountChange}
                options={clickcount.map((clc) => ({
                  label: clc.label,
                  value: clc.value,
                }))}
              />
              <Button type="primary"> 확인</Button>
            </Space>
          </Col>
          <Col flex="auto" />
        </Row>
      </Space>

      <Space>
        <LocalizedModal />
        <Button onClick={confirm}>Confirm</Button>
      </Space>
      {contextHolder}

      <Title level={5}>중복 클릭 IP 목록</Title>

      <Table
        {...tableProps}
        pagination={{
          position: [top],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
      />
    </>
  );
};

const SubTable = () => {
  const subTableColumns = [
    {
      title: '번호',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '클릭 일시',
      dataIndex: 'c_date',
      align: 'center',
    },
    {
      title: '최초 방문 일시',
      dataIndex: 'f_visit',
      align: 'center',
    },
    {
      title: '방문자 IP',
      dataIndex: 'visit_ip',
      align: 'center',
    },
    {
      title: 'CPC 광고 프로그램',
      dataIndex: 'cpc_prog',
      align: 'center',
    },
    {
      title: 'CPC 키워드/상품',
      dataIndex: 'cpc_key_prod',
      align: 'center',
    },
    {
      title: '광고매체',
      dataIndex: 'ad_media',
      align: 'center',
    },
    {
      title: '검색어',
      dataIndex: 'serch_key',
      align: 'center',
    },
  ];
  const subTableData = [];
  for (let i = 1; i <= 10; i++) {
    subTableData.push({
      key: i,
      c_date: '2022-06-02 07:13:25',
      f_visit: '2022-06-02 07:13:25	',
      visit_ip: '122.99.192.187	',
      cpc_prog: '네이버 사이트 검색광고	',
      cpc_key_prod: 'DB마케팅 / 네이버 통합검색 광고더보기 57위	',
      ad_media: 'NAVER(네이버)',
      serch_key: `db마케팅`,
    });
  }

  return (
    <Table
      columns={subTableColumns}
      dataSource={subTableData}
      pagination={false}
    />
  );
};

const LocalizedModal = () => {
  const [open, setOpen] = useState(false);
  const [ip, setIP] = useState('');
  const [description, setDescription] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleIPChange = (e) => {
    setIP(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modal
      </Button>

      <Modal
        title="노출 제한 IP 등록"
        visible={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="확인"
        cancelText="취소"
        width={1000}
      >
        <div className="modal-body">
          <blockquote
            className="bq-bh bq-info top-info font12"
            style={{ background: '#fffcee' }}
          >
            <p>
              <span className="ico_dark"></span> - 광고 노출제한 등록 시 :{' '}
              <span className="b">네이버 클릭초이스</span>는 약 2분 후에
              적용됩니다. (광고매체 사정에 따라 시간차가 있을 수 있습니다.)
            </p>
            <p>
              <span className="ico_dark"></span> 광고노출 제한 IP 등록 가능 수{' '}
              <span className="b">네이버 클릭초이스 600개</span>를 초과할 경우
              광고노출 차단이 동작하지 않습니다.
            </p>
          </blockquote>

          <table className="layer_pop_table font13">
            <colgroup>
              <col width="25%" />
              <col width="75%" />
            </colgroup>
            <tbody>
              <tr>
                <th>광고 노출제한 IP</th>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="IP를 입력하세요."
                    value={ip}
                    onChange={handleIPChange}
                  />
                </td>
              </tr>
              <tr>
                <th>광고 노출제한 IP 등록 설명</th>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="설명을 입력하세요."
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //탭
  const [size, setSize] = useState('small');
  const tapname = [
    'CPC 광고 중복 클릭 IP',
    '네이버 광고노출 차단 이력 및 관리',
    '부정클릭 감시 설정',
  ];
  //측정항목

  return (
    <Layout>
      {/* Lnb */}
      <Sider
        trigger={null}
        collapsible
        width={collapsed ? 0 : 200}
        style={{
          paddingRight: 30,
          background: colorBgContainer,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{
            paddingTop: '64px',
            height: 900, // 원하는 세로길이
            overflowY: 'auto', // 스크롤 적용
            backgroundcolor: '#151b26',
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      {/* GNB */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        {/* 탭 */}

        <Tabs
          defaultActiveKey="1"
          type="card"
          size={size}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: tapname[i],
              key: id,
              children: id === '1' ? <TabDetail /> : null,
            };
          })}
          style={{ backgroundColor: 'white' }}
        />
      </Layout>
    </Layout>
  );
};

export default App;
