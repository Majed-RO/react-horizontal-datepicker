import React from 'react';
import './App.css';
import './components/DatePickerStyles.css';
import { DatePicker } from './components/DatePicker';

function App() {
	const selectedDay = val => {
		console.log(val);
	};

	const startDate = new Date(2010, 0, 1);

	return (
		<div className="App">
			{/* <DatePicker startDate={startDate} 
                    days={366 * 25}
                    type="month"
                    selectDate={new Date(2021, 9, 1)}
                    getSelectedDay={selectedDay} 
                    labelFormat={"MMMM yyyy"} 
                    color={"#374e8c"}/> */}
			<DatePicker
				getSelectedDay={selectedDay}
				endDate={100}
				selectDate={new Date('2020-04-30')}
				labelFormat={'MMMM'}
				color={'#ffffff'}
				btnStyles={{ background: 'transparent' }}
				selectedDayItemStyles={{ fontSize: '0.2em' }}
				selectedDayStyles={{
					margin: '6px 0 0 0',
					color: 'white'
				}}
				selectedDateStyles={{
					border: '1px solid white',
					borderRadius: '50%',
					padding: '4px',
					backgroundColor: 'white',
					color: 'red',
					fontSize: '0.94rem'
				}}
				arrowsStyles={{ fill: 'white' }}
			/>
		</div>
	);
}

export default App;
