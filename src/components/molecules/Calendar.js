import { Day, Empty} from '../atoms/Day';
import styled from 'styled-components';
import { FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { format, differenceInDays, add } from 'date-fns';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import apiData from '../../data/data.js';

const CalendarBox = styled.div`
    padding: 30px 15px;
`;
const Title = styled.h1`
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 30px;
    text-align: center;
`;

function Calendar({data, setData}) {

    // 엑시오스 api 구분
    const getData = () => {
      setData(apiData);
      console.log('데이터를 가져온드아');
    };
  
    useEffect(() => {
      getData();
    }, []);

    // default 요일
    const weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    
    // 해당 달의 모든 일자 가져오긔.
    const { month } = useParams();
    const startDate = new Date(month.substr(0, 4), month.substr(4, 2)-1, 1);
    const endDate = new Date(month.substr(0, 4), month.substr(4, 2), 0);
    const days = [startDate];
    const current = format(startDate, 'yyyy년 MM월');
    for (let i = 1; i <= differenceInDays(endDate, startDate); i++) {
      days.push(add(startDate, {days: i}));
    }
    return (
      <CalendarBox>
        <Title>캘린더 숙죄</Title>
        <Row>
          <Col xs={3}>
            <InputGroup>
              <Link className="btn btn-outline-secondary" to={`/${format(add(startDate, {months: -1}), 'yyyyMM')}`}><FontAwesomeIcon icon={faChevronLeft} /></Link>
              <FormControl value={current} disabled={true} />
              <Link className="btn btn-outline-secondary" to={`/${format(add(startDate, {months: 1}), 'yyyyMM')}`}><FontAwesomeIcon icon={faChevronRight} /></Link>
            </InputGroup>
          </Col>
          <Col xs={1}>
            <Link className="btn btn-outline-danger" to={`/${format(new Date(), 'yyyyMM')}`}>Today</Link>
          </Col>
        </Row>
        <div className="calendar_table">
          {weeks.map((v, i) => <div className="day week" key={i}><div>{v}</div></div>)}
          {weeks.map((v, i) => days[0].getDay() > i ? <Empty key={i} /> : '' )}
          {days.map((v, i) => {
            const todos = data.find((vv) => {
              return vv.date == format(v, 'yyyyMMdd');
            });
            return <Day key={i} day={v} todos={todos} /> 
          })}
          {weeks.map((v, i) => days[days.length-1].getDay() < i ? <Empty key={i} /> : '' )}
        </div>
      </CalendarBox>
    );
  }

  export default Calendar;