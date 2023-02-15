/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
	addDays,
	addMonths,
	differenceInMonths,
	format,
	isSameDay,
	lastDayOfMonth,
	startOfMonth
} from 'date-fns';

const DateView = ({
	startDate,
	lastDate,
	selectDate,
	getSelectedDay,
	primaryColor,
	labelFormat,
	marked,
	selectedDayItemStyles,
	selectedDateStyles,
	selectedDayStyles
}) => {
	const [selectedDate, setSelectedDate] = useState(null);
	const firstSection = { marginLeft: '40px' };
	const selectedStyle = {
		fontWeight: 'semibold',
		width: '45px',
		height: '45px',
		/* borderRadius: '50%',
		border: `2px solid ${primaryColor}`, */
		color: primaryColor,
		...selectedDayItemStyles
	};
	const labelColor = { color: primaryColor };
	const markedStyle = { color: '#8c3737', padding: '2px', fontSize: 12 };

	const getStyles = (day, item = 'item') => {
		let styles = {};
		switch (item) {
			case 'item':
				styles = selectedStyle;
				break;

			case 'date':
				styles = selectedDateStyles;
				break;

			case 'day':
				styles = selectedDayStyles;
				break;

			default:
				styles = selectedStyle;

				break;
		}
		return isSameDay(day, selectedDate) ? styles : null;
	};

	const getId = day => {
		return isSameDay(day, selectedDate) ? 'selected' : '';
	};

	const getMarked = day => {
		let markedRes = marked?.find(i => isSameDay(i.date, day));
		if (markedRes) {
			if (!markedRes?.marked) {
				return;
			}

			return (
				<div
					style={{
						...(markedRes?.style ??
							markedStyle)
					}}
					className={'markedLabel'}
				>
					{markedRes.text}
				</div>
			);
		}

		return '';
	};

	const renderDays = () => {
		const dayFormat = 'E';
		const dateFormat = 'd';

		const months = [];
		let days = [];

		// const styleItemMarked = marked ? styles.dateDayItemMarked : styles.dateDayItem;

		for (
			let i = 0;
			i <= differenceInMonths(lastDate, startDate);
			i++
		) {
			let start, end;
			const month = startOfMonth(addMonths(startDate, i));

			start =
				i === 0
					? Number(
							format(
								startDate,
								dateFormat
							)
					  ) - 1
					: 0;
			end =
				i === differenceInMonths(lastDate, startDate)
					? Number(format(lastDate, 'd'))
					: Number(
							format(
								lastDayOfMonth(
									month
								),
								'd'
							)
					  );

			for (let j = start; j < end; j++) {
				let currentDay = addDays(month, j);

				days.push(
					<div
						id={`${getId(currentDay)}`}
						className={
							marked
								? 'dateDayItemMarked'
								: 'dateDayItem'
						}
						style={getStyles(currentDay)}
						key={currentDay}
						onClick={() =>
							onDateClick(currentDay)
						}
					>
						<div
							className={'dateLabel'}
							style={getStyles(
								currentDay,
								'date'
							)}
						>
							{format(
								currentDay,
								dateFormat
							)}
						</div>
						<div
							className={'dayLabel'}
							style={getStyles(
								currentDay,
								'day'
							)}
						>
							{format(
								currentDay,
								dayFormat
							)}
						</div>

						{getMarked(currentDay)}
					</div>
				);
			}
			months.push(
				<div className={'monthContainer'} key={month}>
					<span
						className={'monthYearLabel'}
						style={labelColor}
					>
						{format(
							month,
							labelFormat ||
								'MMMM yyyy'
						)}
					</span>
					<div
						className={'daysContainer'}
						style={
							i === 0
								? firstSection
								: null
						}
					>
						{days}
					</div>
				</div>
			);
			days = [];
		}

		return (
			<div id={'container'} className={'dateListScrollable'}>
				{months}
			</div>
		);
	};

	const onDateClick = day => {
		setSelectedDate(day);
		if (getSelectedDay) {
			getSelectedDay(day);
		}
	};

	useEffect(() => {
		if (getSelectedDay) {
			if (selectDate) {
				getSelectedDay(selectDate);
			} else {
				getSelectedDay(startDate);
			}
		}
	}, []);

	useEffect(() => {
		if (selectDate) {
			if (!isSameDay(selectedDate, selectDate)) {
				setSelectedDate(selectDate);
				setTimeout(() => {
					let view =
						document.getElementById(
							'selected'
						);
					if (view) {
						view.scrollIntoView({
							behavior: 'smooth',
							inline: 'center',
							block: 'nearest'
						});
					}
				}, 20);
			}
		}
	}, [selectDate]);

	return <React.Fragment>{renderDays()}</React.Fragment>;
};

export { DateView };
