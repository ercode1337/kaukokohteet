"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  label: string;
}

export default function DatePicker({ value, onChange, placeholder, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const months = [
    "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
    "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
  ];

  const weekdays = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fi-FI');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const displayValue = selectedDate ? formatDate(selectedDate) : '';

  return (
    <div className="datepicker-wrapper" ref={dropdownRef}>
      <label className="datepicker-label">{label}</label>
      <div className="datepicker-input-container">
        <input
          type="text"
          className="datepicker-input"
          value={displayValue}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
        />
        <button
          type="button"
          className="datepicker-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="datepicker-dropdown">
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav"
              onClick={() => navigateMonth('prev')}
            >
              ‹
            </button>
            <span className="datepicker-month-year">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              className="datepicker-nav"
              onClick={() => navigateMonth('next')}
            >
              ›
            </button>
          </div>

          <div className="datepicker-calendar">
            <div className="datepicker-weekdays">
              {weekdays.map(day => (
                <div key={day} className="datepicker-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="datepicker-days">
              {getDaysInMonth(currentMonth).map((date, index) => (
                <div
                  key={index}
                  className={`datepicker-day ${!date ? 'empty' : ''} ${
                    date && isToday(date) ? 'today' : ''
                  } ${date && isSelected(date) ? 'selected' : ''}`}
                  onClick={() => date && handleDateSelect(date)}
                >
                  {date ? date.getDate() : ''}
                </div>
              ))}
            </div>
          </div>

          <div className="datepicker-footer">
            <button
              type="button"
              className="datepicker-clear"
              onClick={() => {
                setSelectedDate(null);
                onChange('');
                setIsOpen(false);
              }}
            >
              Tyhjennä
            </button>
            <button
              type="button"
              className="datepicker-today"
              onClick={() => handleDateSelect(new Date())}
            >
              Tänään
            </button>
          </div>
        </div>
      )}
    </div>
  );
}