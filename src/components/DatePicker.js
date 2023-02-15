/* eslint-disable react-hooks/exhaustive-deps */
import { addDays } from 'date-fns';
import React from 'react';
import hexToRgb from '../global/helpers/hexToRgb';
// import styles from './DatePicker.module.css';
import { DateView } from './DateView';
import { MonthView } from './MonthView';

const DatePicker = props => {
	const next = event => {
		event.preventDefault();
		const e = document.getElementById('container');
		const width = e ? e.getBoundingClientRect().width : null;
		e.scrollLeft += width - 60;
	};

	const prev = event => {
		event.preventDefault();
		const e = document.getElementById('container');
		const width = e ? e.getBoundingClientRect().width : null;
		e.scrollLeft -= width - 60;
	};

	const primaryColor = props.color
		? props.color.indexOf('rgb') > 0
			? props.color
			: hexToRgb(props.color)
		: 'rgb(54, 105, 238)';

	const startDate = props.startDate || new Date();
	const lastDate = addDays(startDate, props.days || 90);

	let buttonzIndex = { zIndex: 2 };
	let buttonStyle = { background: primaryColor, ...props.btnStyles };
	let Component = DateView;

	if (props.type === 'month') {
		buttonzIndex = { zIndex: 5 };
		Component = MonthView;
		buttonStyle = { background: primaryColor, marginBottom: '5px' };
	}

	return (
		<div className={'container'}>
			<div className={'buttonWrapper'} style={buttonzIndex}>
				<button
					className={'button'}
					style={buttonStyle}
					onClick={prev}
				>
					<svg
						style={props.arrowsStyles}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
					>
						<path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
					</svg>
				</button>
			</div>
			<Component
				{...props}
				primaryColor={primaryColor}
				startDate={startDate}
				lastDate={lastDate}
				selectedContainerStyles={
					props.selectedContainerStyles
				}
				selectedDateStyles={props.selectedDateStyles}
				selectedDayStyles={props.selectedDayStyles}
			/>
			<div className={'buttonWrapper'} style={buttonzIndex}>
				<button
					className={'button'}
					style={buttonStyle}
					onClick={next}
				>
					<svg
						style={props.arrowsStyles}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
					>
						<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export { DatePicker };
