import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Space, Table, Tooltip, Typography } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone, SearchOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const getAverage = ({ marks }) => {
  return marks.reduce((acc, mark) => acc + mark, 0) / marks.length;
};

const isGraduated = ({ marks }) => {
  return getAverage({ marks }) >= 2.8;
};

const filterProps = {
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={'Search...'}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          height: 50,
        }}
      >
        <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small">
          Search
        </Button>
        <Button onClick={() => clearFilters()} size="small">
          Reset
        </Button>
      </div>
    </div>
  ),
  filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
};

const columns = [
  {
    title: 'Name',
    key: 'name',
    index: 'name',
    fixed: 'left',
    width: 150,
    // ok, render below takes parameters `text`, `record` and `index`, but maybe bug happend so `text` has
    // equal to `record` value
    render: (_, record) => (
      <div style={{ display: 'block' }}>
        <Text>{record.name}</Text>
      </div>
    ),
    onFilter: (val, record) => record.name.toLowerCase().includes(val.toLowerCase()),
    ...filterProps,
  },
  {
    title: 'Surname',
    key: 'surname',
    index: 'surname',
    fixed: 'left',
    width: 150,
    render: (_, record) => (
      <div style={{ display: 'block' }}>
        <Text>{record.surname}</Text>
      </div>
    ),
    onFilter: (val, record) => record.surname.toLowerCase().includes(val.toLowerCase()),
    ...filterProps,
  },
  {
    title: 'Group',
    key: 'group',
    index: 'group',
    width: 150,
    render: (_, record) => <Text>{record.group}</Text>,
    onFilter: (val, record) => record.group.toLowerCase().includes(val.toLowerCase()),
    ...filterProps,
  },
  {
    title: 'Math',
    key: 'math',
    index: 'math',
    width: 150,
    render: (_, record) => (
      <Text type={record.math < 2.8 ? 'danger' : undefined}>{Number(record.math).toFixed(2)}</Text>
    ),
  },
  {
    title: 'Russian',
    key: 'russian',
    index: 'russian',
    width: 150,
    render: (_, record) => (
      <Text type={record.russian < 2.8 ? 'danger' : undefined}>{Number(record.russian).toFixed(2)}</Text>
    ),
  },
  {
    title: 'Literature',
    key: 'literature',
    index: 'literature',
    width: 150,
    render: (_, record) => (
      <Text type={record.literature < 2.8 ? 'danger' : undefined}>{Number(record.literature).toFixed(2)}</Text>
    ),
  },
  {
    title: 'Avgerage',
    key: 'avgMark',
    index: 'avgMark',
    width: 150,
    render: (_, record) => (
      <Text>{Number(getAverage({ marks: [record.math, record.russian, record.literature] })).toFixed(2)}</Text>
    ),
  },
  {
    title: 'Graduated',
    key: 'isGraduated',
    index: 'isGraduated',
    align: 'center',
    width: 120,
    render: (_, record) => (
      <div style={{ fontSize: 20 }}>
        {isGraduated({ marks: [record.math, record.russian, record.literature] }) ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#f5222d" />
        )}
      </div>
    ),
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);

  const [datasource, setDatasource] = useState([
    {
      name: '1',
      surname: 'Person',
      group: '5A',
      math: 4.67,
      russian: 4.25,
      literature: 4.36,
    },
    {
      name: '2',
      surname: 'Person',
      group: '5B',
      math: 3.67,
      russian: 4.71,
      literature: 4.68,
    },
    {
      name: 'Mega',
      surname: 'Person',
      group: '5A',
      math: 5.0,
      russian: 5.0,
      literature: 5.0,
    },
    {
      name: 'So',
      surname: 'Bad',
      group: '5B',
      math: 2.71,
      russian: 2.8,
      literature: 2.61,
    },
    {
      name: 'Super',
      surname: 'Hero',
      group: '5C',
      math: 4.0,
      russian: 3.25,
      literature: 4.1,
    },
    {
      name: 'Amazing',
      surname: 'Hero',
      group: '5C',
      math: 4.01,
      russian: 4.0,
      literature: 3.99,
    },
    {
      name: 'Mega',
      surname: 'Failer',
      group: '5A',
      math: 2.79,
      russian: 2.81,
      literature: 2.78,
    },
    {
      name: 'Magical',
      surname: 'Divide',
      group: '5B',
      math: 2.8,
      russian: 2.7,
      literature: 2.9,
    },
    {
      name: 'SuperLongName',
      surname: 'SuperLongLongSurname',
      group: '5B',
      math: 2.8,
      russian: 2.7,
      literature: 2.9,
    },
  ]);

  const addNewRow = (record) => {
    setDatasource([...datasource, record]);
    setShowModal(false);
  };

  const deleteRow = (index) => {
    if (index > -1 && index < datasource.length) {
      const ds = datasource.slice();
      ds.splice(index, 1);
      setDatasource(ds);
    }
  };

  const cols = [
    ...columns,
    {
      title: '',
      key: 'actions',
      index: 'actions',
      align: 'center',
      width: 60,
      render: (_, record, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
          }}
        >
          <Tooltip title={`Delete "${record.name} ${record.surname}"`}>
            <Button
              shape="circle"
              type="text"
              icon={<DeleteTwoTone twoToneColor="#f5222d" />}
              onClick={() => deleteRow(index)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Title level={3}>22. Создать на React электронный журнал и фильтрацию по нему</Title>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '80%',
          height: '85%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: '6px 0',
          }}
        >
          <Button onClick={() => setShowModal(true)} type="primary">
            Add a student
          </Button>
        </div>
        <Table columns={cols} dataSource={datasource} bordered scroll={{ x: 1100, y: 500 }} pagination={false}></Table>
      </div>
      <Modal title="Create a new student" footer={null} visible={showModal} closable={false}>
        <Form onFinish={addNewRow} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Surname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="group" label="Group" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="math" label="Math" rules={[{ required: true }]}>
            <InputNumber defaultValue={0} min={2} max={5} precision={2} step={0.1} />
          </Form.Item>
          <Form.Item name="russian" label="Russian" rules={[{ required: true }]}>
            <InputNumber defaultValue={0} min={2} max={5} precision={2} step={0.1} />
          </Form.Item>
          <Form.Item name="literature" label="Literature" rules={[{ required: true }]}>
            <InputNumber defaultValue={0} min={2} max={5} precision={2} step={0.1} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space size="large">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
