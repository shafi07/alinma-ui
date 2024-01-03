import { useState,useEffect,useRef } from 'react';
import { useNavigate,useLocation} from "react-router-dom";

import { Col, Divider, Row, Table } from "antd";
import "antd/dist/antd.min.css";

export default function Print (){

    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state

    console.log('print>>>>>>',data)

    useEffect(() => {
        window.print();
        navigate(`/dashboard/${data.path}`)
      },[]);

  return (
    <div style={{ padding: 20 }}>
      <Row >
        <Col  style={{width:'100%'}}>
          <Divider>Alinma-Invoice</Divider>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 32}}>
        <Col span={10} >
          <h1>Alinma Travles</h1>
          <div>Near Gold Market(Sulaimaniya),</div>
          <div>Al kharj</div>
          <div>Riyadh, Saudi Arabia</div>
        </Col>
        <Col span={10} offset={16}>
          <table>
            <tr>
              <th>File No :</th>
              <td>{`${data.fileid}`}</td>
            </tr>
            <tr>
              <th>Invoice Date :</th>
              <td>{new Date().toLocaleString().split(',')[0].replaceAll('/','-')}</td>
            </tr>
          </table>
        </Col>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <div>
          Bill To: <strong>Alinma-Travels Ltd</strong>
        </div>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Table
          dataSource={[data]}
          pagination={false}
          style={{width:'100%'}}
        >
          <Table.Column title="Name" dataIndex="name" />
          <Table.Column title="Service" dataIndex="sub_category" />
          <Table.Column title="ID number" dataIndex="id_number" />
          <Table.Column title="Total" dataIndex="total_amount" />
          <Table.Column title="Balance" dataIndex="balance_amount" />
        </Table>
      </Row>

      <Row style={{ marginTop: 48 }}>
        <Col span={8} offset={16}>
          <table>
            <tr>
              <th>Gross Total :</th>
              <td>{` SR. ${data.total_amount}`}</td>
            </tr>
            <tr>
              <th>Paid Amount :</th>
              <td>{` SR. ${data.paid_amount}`}</td>
            </tr>
            <tr>
              <th>Balance:</th>
              <td>{` SR. ${data.balance_amount}`}</td>
            </tr>
          </table>
        </Col>
      </Row>
    </div>
  );
};

